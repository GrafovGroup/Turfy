import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createClient} from '@formspree/core';
import {enquirySchema} from '../lib/enquiry.ts';
import {FORMSPREE_FORM_ID,FORMSPREE_ENDPOINT,toFormspreePayload} from '../lib/formspree.ts';

const fixture={requestId:'12ca6c24-b360-437b-ae79-0a2c697b2ae7',type:'rental',application:'event',name:'Integration Test',email:'test@example.com',phone:'',company:'',city:'Toronto, Ontario',postalCode:'M5V 1A1',area:'125',unit:'sqm',surface:'indoor-floor',setting:'indoor',startDate:'2099-06-02',endDate:'2099-06-04',setupDate:'2099-06-01',removalDate:'2099-06-05',delivery:true,installation:true,removal:true,notes:'Product interest: Event turf rental\nVenue access via freight lift.',consent:true,website:''};

test('Formspree integration uses the supplied endpoint and preserves the complete brief',async t=>{
 const payload=toFormspreePayload(enquirySchema.parse(fixture));
 let sent;
 t.mock.method(globalThis,'fetch',async(url,options)=>{sent={url,options};return Response.json({next:'/thanks'});});
 const result=await createClient().submitForm(FORMSPREE_FORM_ID,payload);
 assert.equal(result.kind,'success');assert.equal(sent.url,'https://formspree.io/f/xppwqqvz');assert.equal(sent.url,FORMSPREE_ENDPOINT);assert.equal(sent.options.method,'POST');assert.equal(sent.options.headers.Accept,'application/json');
 const body=JSON.parse(sent.options.body);
 for(const [field,value] of Object.entries(fixture))if(!['requestId','notes','website'].includes(field))assert.equal(body[field],value,field);
 assert.equal(body.message,fixture.notes);assert.equal(body.reference,'TF-'+fixture.requestId.toUpperCase());assert.equal(body._gotcha,'');assert.equal(body._subject,'Turfy rental enquiry');assert(!('notes' in body));assert(!('website' in body));
});
test('sales and installation requests retain their service and product context',()=>{
 for(const type of ['sales','installation']){const data=enquirySchema.parse({...fixture,type,startDate:'',endDate:'',setupDate:'',removalDate:'',removal:false,application:'pets',notes:'Product interest: Pet turf'});const payload=toFormspreePayload(data);assert.equal(payload.type,type);assert.equal(payload.message,'Product interest: Pet turf');assert.equal(payload.removal,false);assert.equal(payload.startDate,'');}
});
test('invalid consent, honeypot, email and rental dates are rejected before sending',()=>{
 for(const changes of [{consent:false},{website:'spam'},{email:'invalid'},{endDate:'2099-06-01'},{setupDate:'2099-06-03'},{removalDate:'2099-06-03'}])assert.equal(enquirySchema.safeParse({...fixture,...changes}).success,false);
});
test('Formspree field and account errors are not accepted as success',async t=>{
 t.mock.method(globalThis,'fetch',async()=>Response.json({errors:[{field:'email',code:'TYPE_EMAIL',message:'Invalid email'},{code:'INACTIVE',message:'Form inactive'}]},{status:422}));
 const result=await createClient().submitForm(FORMSPREE_FORM_ID,toFormspreePayload(fixture));assert.equal(result.kind,'error');assert.equal(result.getFieldErrors('email')[0].message,'Invalid email');assert.equal(result.getFormErrors()[0].message,'Form inactive');
});
test('network failure and unexpected responses preserve an error result',async t=>{
 const client=createClient();const payload=toFormspreePayload(fixture);const before=JSON.stringify(payload);
 const fetch=t.mock.method(globalThis,'fetch',async()=>{throw new TypeError('Network unavailable');});assert.equal((await client.submitForm(FORMSPREE_FORM_ID,payload)).kind,'error');assert.equal(JSON.stringify(payload),before);
 fetch.mock.mockImplementation(async()=>Response.json({unrecognized:true},{status:503}));assert.equal((await client.submitForm(FORMSPREE_FORM_ID,payload)).kind,'error');
});
