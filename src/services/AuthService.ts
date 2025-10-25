import InMemoryUserRepository from "../repositories/in-memory/InMemoryUserRepository";
import { AuthInterface, AuthRefreshTokenInterface } from "../schemas/AuthSchema";
import bcrypt from 'bcrypt';
import { decodeToken, generateToken, verifyToken } from "./helpers/AuthHelpers";


class AuthService {

    async authenticate (dataValidate: AuthInterface) {
        const inMemoryUserRepository = new InMemoryUserRepository();
        const dataUser = await inMemoryUserRepository.findByEmail(dataValidate.email);  

        if(!dataUser) {
            throw new Error("Something wrong with your email or password!");
        }

        const isPasswordValid = await bcrypt.compare(dataValidate.password, dataUser.password);

        if(!isPasswordValid) {
            throw new Error("Something wrong with your email or password!");
        }

        dataUser.password = "Password protected";

        const token = generateToken(dataUser, process.env.JWT_TOKEN_EXPIRES_IN as string);
        const refresh_token = generateToken(dataUser, process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string);

        return {token, refresh_token};

        return {user: dataUser, status: "Authenticated successfully!"};
    }

    async refreshToken (dataValidate: AuthRefreshTokenInterface) {
        const verifyJwtToken = verifyToken(dataValidate.token);
        const verifyRefreshToken = verifyToken(dataValidate.refresh_token);

        if (!verifyJwtToken && !verifyRefreshToken) {
            throw new Error("Invalid tokens!");   
        }
      
        const { name, email, password} = decodeToken(dataValidate.refresh_token);
        const payloadToken = { name, email, password };

        const token = generateToken(payloadToken, process.env.JWT_TOKEN_EXPIRES_IN as string);
        const refresh_token = generateToken(payloadToken, process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string);

        return { token, refresh_token };

    }    

}

export default AuthService;
