import jwt, { SignOptions, Secret } from 'jsonwebtoken';

export const generateToken = (payload: any, expiresIn: any): string => {
    const secret: Secret = process.env.JWT_SECRET as Secret;
    const option: SignOptions = { expiresIn };

    const token = jwt.sign(payload, secret, option);
    return token;
};

export const decodeToken = (token: string): any => {
    const payloadToken = jwt.decode(token);
    return payloadToken;
}

export const verifyToken = (jwtToken: string): boolean => {

    try {
        jwt.verify(jwtToken, process.env.JWT_SECRET as Secret);
        return true;
    } catch (err: any) {
        return false
    }
}