import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { COUNTRY } from "src/data/countryList";
import { Country } from "./schema/country.schema";

@Injectable()
export class CountryService {
    constructor(
        @InjectModel(Country.name)
        private countryModel: Model<Country>
    ) {
        this.initializer();
    }

    public async initializer(): Promise<void> {
        try {
            const getCountries = await this.getAllCountry();
            if(getCountries.length === 0) this.bulkWrite(COUNTRY);
        } catch (error) {
            throw Error("Can't insert new country");
        }
    }

    private async bulkWrite(country: Country[]) {
        return this.countryModel.insertMany(country);
    }

    public getAllCountry(): Promise<Country[]> {
        return this.countryModel.find().exec();
    }
}