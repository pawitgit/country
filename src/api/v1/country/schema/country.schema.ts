import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CountryDocument = HydratedDocument<Country>;

@Schema({timestamps: true})
export class Country {
    @Prop({ required: true, unique: true })
    name: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);