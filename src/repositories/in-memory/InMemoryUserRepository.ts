import { User } from "../../models/User";

class InMemoryUserRepository {

    // Forever use _ in private attributes.
    private _users: User[];

    constructor() {
        this._users = [{name: "Maycon", email: "exemple@contact.com",
        password: "$2b$10$IhiarM1JywkChisyGUJeEek.PKCfEIA6u4jZASLAosCyIkmhKZsYe"}];
    }

    async findByEmail (email: string): Promise<User> {
        const user = this._users.filter(user => user.email === email);
        return user[0];
    }

}

export default InMemoryUserRepository;