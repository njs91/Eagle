import * as Yup from 'yup';

const pageTypes: Array<string> = ['landing', 'sale', 'other'];
const slugRegex: RegExp = new RegExp(`^[/ \\w-]*$`);

export const createPageSchema = Yup.object().shape({
    title: Yup.string().trim().max(40, 'Enter a maximum of 40 characters').required('Enter a title'),
    type: Yup.string().oneOf(pageTypes, 'Enter a type'),
    slug: Yup.string()
        .trim()
        .max(60, 'Enter a maximum of 60 characters')
        .matches(slugRegex, 'Invalid slug')
        .notRequired(),
});
