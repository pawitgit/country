import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("/auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get()
    public index(): string {
        return "Hello";
    }

    @HttpCode(HttpStatus.OK)
    @Post("/login")
    public signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
}