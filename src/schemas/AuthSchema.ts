import Yup, { object, string } from 'yup';  

export const authSchema = object().shape({
    email: string().email("Email is wrong!").required(),
    password: string().min(6, "Password is wrong!").required(),
});

export type AuthInterface = Yup.InferType<typeof authSchema>;