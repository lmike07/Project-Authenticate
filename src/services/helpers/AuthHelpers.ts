import jwt, { SignOptions, Secret } from 'jsonwebtoken';

export const generateToken = (payload: any, expiresIn: any): string => {
    const secret: Secret = process.env.JWT_SECRET as Secret;
    const option: SignOptions = { expiresIn };

    const token = jwt.sign(payload, secret, option);
    return token;
};