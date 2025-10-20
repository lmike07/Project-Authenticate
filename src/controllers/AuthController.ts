import { Request, Response } from "express";
import { authSchema } from "../schemas/AuthSchema";
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

    }

}

export default AuthController;