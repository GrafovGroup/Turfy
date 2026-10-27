import {test} from 'node:test';
import assert from 'node:assert/strict';
import {localizedPath,languageAlternates} from '../lib/locale.ts';
test('language switches preserve equivalent paths and project query parameters',()=>{
 for(const [en,fr] of [['/','/fr'],['/products/pet-turf','/fr/products/pet-turf'],['/quote?area=300&unit=sqft&city=montreal','/fr/quote?area=300&unit=sqft&city=montreal'],['/?type=sales','/fr?type=sales']]){assert.equal(localizedPath(en,'fr'),fr);assert.equal(localizedPath(fr,'en'),en);assert.equal(localizedPath(fr,'fr'),fr);assert.equal(localizedPath(en,'en'),en);}
 assert.equal(localizedPath('/france','en'),'/france');
});
test('language alternates are reciprocal on English and French routes',()=>{
 const en=languageAlternates('/locations/montreal'),fr=languageAlternates('/fr/locations/montreal');assert.deepEqual(en,fr);assert.deepEqual(fr,{'en-CA':'/locations/montreal','fr-CA':'/fr/locations/montreal','x-default':'/locations/montreal'});
});
