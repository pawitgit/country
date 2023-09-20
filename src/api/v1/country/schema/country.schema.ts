import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type CountryDocument = HydratedDocument<Country>;

@Schema({timestamps: true})
export class Country {
    @ApiProperty({ example: "Thailand" })
    @Prop({ required: true, unique: true })
    name: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);