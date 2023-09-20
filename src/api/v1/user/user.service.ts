import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/api/v1/user/schema/user.schema";
import { Country } from "../country/schema/country.schema";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Country.name) private countryModel: Model<Country>
        ) {
    }

    public async getAllUser(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    private async createUser(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    public async auth(username: string): Promise<User> {
        const user = await this.userModel.findOne({ username })
            .populate(Country.name.toLowerCase()).exec();
        return user;
    }
    
    public async register(userDto: User): Promise<User> {
        const { username, password, fname, lname, country } = userDto;
        const getCountry = await this.countryModel.findOne({name: country});
        if(!getCountry) throw new Error("Can't find country");
        const user = { username, password, fname, lname, country: getCountry } as User;
        return this.createUser(user);
    };
}