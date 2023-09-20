import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import AuthInterface from "../interfaces/auth.interface";
import { JwtService } from "@nestjs/jwt";
import PayloadInterface from "../interfaces/payload.interface";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {
        // (async() => {
        //     let user = await this.signIn("pawit", "123456");
        //     console.log(user);
        // })();
    }

    async signIn(username: string, password: string): Promise<PayloadInterface> {
        const u = await this.userService.auth(username)
        if(!u || u?.password !== password) {
            throw new UnauthorizedException();
        }

        const user = u as any;
        const payload: AuthInterface = {
            sub: user._id.toString(),
            username: user.username
        }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}