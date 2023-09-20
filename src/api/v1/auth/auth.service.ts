import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import AuthInterface from "../interfaces/auth.interface";

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {
        // (async() => {
        //     let user = await this.signIn("pawit", "123456");
        //     console.log(user);
        // })();
    }

    async signIn(username: string, password: string): Promise<AuthInterface> {
        const user = await this.userService.auth(username)
        if(!user || user?.password !== password) {
            throw new UnauthorizedException();
        }


        const result: AuthInterface = {
            username: user.username,
            fname: user.fname,
            lname: user.lname,
            country: user.country,
            token: ''
        }
        return result;
    }
}