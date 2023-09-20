import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request, HttpException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "../user/schema/user.schema";
import { UserService } from "../user/user.service";

@Controller("/auth")
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post("/login")
    public signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post("/register")
    public async createUser(@Body() userDto: Record<string, any>) {
        try {
            if(!userDto) throw new HttpException('400 Bad Request', HttpStatus.BAD_REQUEST);
            return await this.userService.register(userDto);
        } catch (error) {
            let errMgs = "";
            if(error.message.search("duplicate") !== -1) {
                errMgs = `${userDto.username} already exist`;
            }
            throw new HttpException(errMgs, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}