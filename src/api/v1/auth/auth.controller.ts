import { Body, Controller, HttpCode, HttpStatus, Post, HttpException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "../user/schema/user.schema";
import { UserService } from "../user/user.service";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("/auth")
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {}


    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            username: {
                type: "string",
                example: "pawit",
                description: "enter username"
            },
            password: {
                type: "string",
                example: "123456",
                description: "enter password of user"
            }
          },
        },
      })
    @ApiOkResponse({
        description: "response json object {access_token: ...}"
    })
    @ApiBadRequestResponse({
        description: `response message string "Unauthorized"`,
        status: 401
    })
    @Post("/login")
    public signIn(@Body() user: User) {
        return this.authService.signIn(user.username, user.password);
    }


    @ApiCreatedResponse({
        description: 'The user records',
        type: User,
        isArray: true
    })
    @ApiBadRequestResponse({ description: "example: Username already exist, Bad Request, Can't find country"})
    @Post("/register")
    public async createUser(@Body() user: User) {
        try {
            if(!user) throw new HttpException('Bad Request user is Empty Object', HttpStatus.BAD_REQUEST);
            return await this.userService.register(user);
        } catch (error) {
            if(error.message.search("duplicate") !== -1) {
                throw new HttpException(`${user.username} already exist`, HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            }
        }
    }
}