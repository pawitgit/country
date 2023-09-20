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
        
        this.test();
    }

    public async getAllUser(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    public async createUser(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    public async findOne(username: string): Promise<User> {
        const user = await this.userModel.findOne({ username });
        return user;
    }
    
    public async test() {
        // const user = new User();
        // const ct = await this.countryModel.find({name: "Thailand"});
        // user.country = ct[0];
        // user.fname = "Pawit";
        // user.lname = "Thongpramoon";
        // user.password = "123456";
        // user.username = "pawit";
        // this.createUser(user);
    };
}