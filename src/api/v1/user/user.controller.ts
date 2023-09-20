import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./schema/user.schema";
import { AuthGuard } from "../auth/auth.guard";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("User")
@Controller("/user")
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @UseGuards(AuthGuard)
    @ApiBearerAuth("Authorization")
    @ApiOkResponse({
        schema: {
            type: 'array',
              items: {
                properties: {
                    username: { type: "string",  example: "pawit", },
                    fname: { type: "string", example: "pawit", },
                    lname: { type: "string", example: "Thongpramoon", },
                    country: { 
                      properties: {
                          name: { type: "string", example: "Thailand" }
                      }
                  },
              },
              }
          },
    })
    @ApiBadRequestResponse({ description: "400 Bad Request"})
    @Get()
    public getAllUser(): Promise<User[] | string> {
        try {
            return this.userService.getAllUser();
        } catch (error) {
            throw new HttpException('400 Bad Request', HttpStatus.BAD_REQUEST);
        }
    }
}