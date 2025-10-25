import { Request, Response } from "express";
import { authSchema, authSchemaRefreshToken, AuthRefreshTokenInterface } from "../schemas/AuthSchema";
import AuthService from "../services/AuthService";




class AuthController {

    async authenticate(req: Request, res: Response) {
        try {

            const authService = new AuthService();
            const dataValidate = await authSchema.validate(req.body, {stripUnknown: true});
            const resultAuthenticate = await authService.authenticate(dataValidate);
            
            return res.status(200).json(resultAuthenticate);
        } catch (err: any) {
            res.status(400).json({error: err.message});
        }
    }

    async refreshToken(req: Request, res: Response) {
        try {

            const authService = new AuthService();
            const dataValidate: AuthRefreshTokenInterface = await authSchemaRefreshToken.validate(req.body, {stripUnknown: true});
            const resultRefreshToken = await authService.refreshToken(dataValidate);

            return res.status(200).json(resultRefreshToken);
        } catch (err: any) {
            res.status(400).json({error: err.message});
        }
    }

    async getUsers(req: Request, res: Response) {
        res.json({success: true})
    }


}

export default AuthController;