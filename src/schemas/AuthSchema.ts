import Yup, { object, string } from 'yup';  

export const authSchema = object().shape({
    email: string().email("Email is wrong!").required(),
    password: string().min(6, "Password is wrong!").required(),
});

export const authSchemaRefreshToken = object().shape({
    token: string().required(),
    refresh_token: string().required()
})

export type AuthInterface = Yup.InferType<typeof authSchema>;

export type AuthRefreshTokenInterface = Yup.InferType<typeof authSchemaRefreshToken>;