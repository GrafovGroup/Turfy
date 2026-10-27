import {z} from 'zod';
export const applications=['landscape','commercial','pets','golf','sport','play','event','not-sure'] as const;
const short=z.string().trim().max(200);
const date=z.string().refine(v=>!v||(/^\d{4}-\d{2}-\d{2}$/.test(v)&&!Number.isNaN(Date.parse(v))&&new Date(v).toISOString().slice(0,10)===v),'Enter a valid date.');
export const enquirySchema=z.object({
 requestId:z.string().uuid(),type:z.enum(['sales','rental','installation']),application:z.enum(applications),
 name:short.min(2,'Enter your name.'),email:z.string().trim().email('Enter a valid email address.').max(254),phone:z.string().trim().max(40),company:short,
 city:short.min(2,'Enter your city and province.'),postalCode:z.string().trim().max(20),
 area:z.string().trim().max(20).refine(v=>!v||(Number.isFinite(Number(v))&&Number(v)>0&&Number(v)<=100000000),'Enter a positive area or leave it blank.'),unit:z.enum(['sqft','sqm']),
 surface:z.enum(['not-sure','soil','concrete','asphalt','pavers','deck','indoor-floor','other']),setting:z.enum(['outdoor','indoor','mixed','not-sure']),
 startDate:date,endDate:date,setupDate:date,removalDate:date,
 delivery:z.boolean(),installation:z.boolean(),removal:z.boolean(),notes:z.string().trim().max(4000),consent:z.literal(true),website:z.string().max(200)
}).strict().superRefine((d,c)=>{const issue=(path:string,message:string)=>c.addIssue({code:z.ZodIssueCode.custom,path:[path],message});if(d.website)issue('website','Unable to accept this request.');if(d.type==='rental'){if(!d.startDate)issue('startDate','Enter your rental start date.');if(!d.endDate)issue('endDate','Enter your rental end date.');if(d.startDate&&d.startDate<new Date().toISOString().slice(0,10))issue('startDate','Choose a current or future rental date.');if(d.startDate&&d.endDate&&d.endDate<d.startDate)issue('endDate','Rental end date must be on or after the start date.');if(d.setupDate&&d.startDate&&d.setupDate>d.startDate)issue('setupDate','Setup must be on or before the rental starts.');if(d.removalDate&&d.endDate&&d.removalDate<d.endDate)issue('removalDate','Removal must be on or after the rental ends.');}});
