import { Controller, Get, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { Country } from "./schema/country.schema";
import { CountryService } from "./country.service";
import { AuthGuard } from "../auth/auth.guard";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("Country")
@Controller("/country")
export class CountryController {
    constructor(
        private countryService: CountryService
    ) { }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("Authorization")
    @ApiOkResponse({
        description: 'response Master Country',
        type: Country,
        isArray: true
    })
    @ApiBadRequestResponse({ description: "500 Internal Server Error or Unauthorized when authorize failed"})
    @Get("/")
    public async getAllCountry(): Promise<Country[]> {
        try {
            return await this.countryService.getAllCountry();
        } catch (error) {
            let errMgs = "";
            if(error.message.toLowerCase() === "unauthorized") {
                errMgs = "Unauthorized"
            } else {
                errMgs = "500 Internal Server Error";
            }
            throw new HttpException(errMgs, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}