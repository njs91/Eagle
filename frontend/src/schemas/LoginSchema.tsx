import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    username: Yup.string().trim().max(40, 'Enter a maximum of 30 characters').required('Enter a username'),
    password: Yup.string().required('Enter a password'),
});
