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
    ) { }


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
        schema: {
            type: 'object',
            properties: {
                access_token: {
                    type: "string",
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTBiMDEwMjkxNDBiMmE3NDc3ZTNjMWMiLCJ1c2VybmFtZSI6InBhd2l0IiwiaWF0IjoxNjk1MjE5OTgwLCJleHAiOjE2OTUyMjExODB9._dJ7Yks6J7H1hbMMU5rHBKKVqv99hCFMUigkznCK4Tg",
                }
            },
        },
        description: "response jwt token"
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
        schema: {
            properties: {
                username: { type: "string",  example: "pawit", },
                fname: { type: "string", example: "pawit", },
                lname: { type: "string", example: "Thongpramoon", },
                country: { 
                  properties: {
                      name: { type: "string", example: "Thailand" }
                  }
              },
          }
        },
        description: 'The user records'
    })
    @ApiBadRequestResponse({ description: "example: Username already exist, Bad Request, Can't find country" })
    @Post("/register")
    public async createUser(@Body() user: User) {
        try {
            if (!user) throw new HttpException('Bad Request user is Empty Object', HttpStatus.BAD_REQUEST);
            return await this.userService.register(user);
        } catch (error) {
            if (error.message.search("duplicate") !== -1) {
                throw new HttpException(`${user.username} already exist`, HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            }
        }
    }
}