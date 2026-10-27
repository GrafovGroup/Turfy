import type {z} from 'zod';
import type {enquirySchema} from './enquiry';

export const FORMSPREE_FORM_ID = 'xppwqqvz';
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/' + FORMSPREE_FORM_ID;

export function toFormspreePayload(data:z.infer<typeof enquirySchema>) {
  const {requestId,website,notes,...fields}=data;
  return {
    ...fields,
    message:notes,
    reference:'TF-'+requestId.toUpperCase(),
    _subject:'Turfy '+data.type+' enquiry',
    _gotcha:website,
  };
}
