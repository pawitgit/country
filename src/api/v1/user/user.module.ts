import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema/user.schema";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { CountryModule } from "../country/country.module";
import { Country, CountrySchema } from "../country/schema/country.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Country.name, schema: CountrySchema },
        ]),
        CountryModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
}) 
export class UserModule {}