import InMemoryUserRepository from "../repositories/in-memory/InMemoryUserRepository";
import { AuthInterface } from "../schemas/AuthSchema";
import bcrypt from 'bcrypt';


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
        
        return {user: dataUser, status: "Authenticated successfully!"};
    }

    async refreshToken () {

    }

}

export default AuthService;
