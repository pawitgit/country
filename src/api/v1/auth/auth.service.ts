import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import AuthInterface from "../interfaces/auth.interface";
import { JwtService } from "@nestjs/jwt";
import PayloadInterface from "../interfaces/payload.interface";
import { decrypt } from "../shared/bcryptPassword";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(username: string, password: string): Promise<PayloadInterface> {
        const u = await this.userService.auth(username)

        const comparePassword = await decrypt(password, u?.password);
        if(!u || !comparePassword) {
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