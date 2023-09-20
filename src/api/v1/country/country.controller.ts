import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { Country } from "./schema/country.schema";
import { CountryService } from "./country.service";

@Controller("/country")
export class CountryController {
    constructor(
        private countryService: CountryService
    ) { }

    @Get("/")
    public getAllCountry(): Promise<Country[]> {
        try {
            return this.countryService.getAllCountry();
        } catch (error) {
            throw new HttpException('500 Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}