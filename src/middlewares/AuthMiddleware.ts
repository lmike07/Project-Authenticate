import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';


export const AuthMiddleware = async (req: Request, res:Response, Next: NextFunction) => {

    try {
        const authService = new AuthService();

        const {authorization, refresh_token} = req.headers;

        if (authorization && refresh_token){
            const tokens = await authService.refreshToken({token: authorization, refresh_token: refresh_token as string} );

            res.set("authorization", tokens.token);
            res.set("refresh_token", tokens.refresh_token);

            Next();
            return;

            throw new Error("Authorization and Refresh Token is required");
    }

    } catch (err: any) {
        res.status(400).json({error: err.message});
    }

}