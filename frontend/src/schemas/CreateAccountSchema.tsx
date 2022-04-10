import * as Yup from 'yup';

export const usernameSchema = Yup.string()
    .trim()
    .required('Enter a username')
    .min(2, 'Enter a minimum of 2 characters')
    .max(40, 'Enter a maximum of 30 characters');

export const createAccountSchema = Yup.object().shape({
    email: Yup.string().email('Enter a valid email address').required('Enter an email address'),
    password: Yup.string().required('Enter a password'),
    firstName: Yup.string().required('Enter your first name'),
    lastName: Yup.string().nullable(),
    username: usernameSchema,
});
