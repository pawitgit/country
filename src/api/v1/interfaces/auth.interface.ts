import { Country } from "../country/schema/country.schema";

export default interface AuthInterface {
    username: string;
    fname: string;
    lname: string;
    country: Country;
    token: string;
}