import { Controller, Get, HttpException, HttpStatus, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./schema/user.schema";

@Controller("/user")

export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Get()
    public getAllUser(): Promise<User[] | string> {
        try {
            return this.userService.getAllUser();
        } catch (error) {
            throw new HttpException('500 Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post("/create")
    public createUser(@Query('user') user: User): Promise<User | string> {
        try {
            if(!user) throw new HttpException('400 Bad Request', HttpStatus.BAD_REQUEST);
            return this.userService.createUser(user);
        } catch (error) {
            throw new HttpException('500 Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}