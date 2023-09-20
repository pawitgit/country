import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Country } from "../../country/schema/country.schema";
import { IsNotEmpty } from 'class-validator';

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
})
export class User {
    @IsNotEmpty()
    @Prop({ required: true, unique: true, min: 4, max: 100 })
    username: string;

    @IsNotEmpty()
    @Prop({ required: true, min: 8 })
    password: string;

    @IsNotEmpty()
    @Prop({ required: true })
    fname: string;

    @IsNotEmpty()
    @Prop({ required: true })
    lname: string;

    @IsNotEmpty()
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: Country.name })
    country: Country
}

export const UserSchema = SchemaFactory.createForClass(User);