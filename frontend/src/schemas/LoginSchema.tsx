import * as Yup from 'yup';
import { usernameSchema } from './CreateAccountSchema';

export const loginSchema = Yup.object().shape({
    username: usernameSchema,
    password: Yup.string().required('Enter a password'),
});
