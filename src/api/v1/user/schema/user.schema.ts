import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Country } from "../../country/schema/country.schema";
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
})
export class User {
    @ApiProperty({
        description: "username of user",
        example: "pawit"
    })
    @IsNotEmpty()
    @Prop({ required: true, unique: true, min: 4, max: 100 })
    username: string;

    @ApiProperty({
        description: "password of user",
        example: "$2b$10$/a8WpvCbWUkzAJuS7vwbmefCUNpS26goMHo7hwjVUigfH5Y2akR.K"
    })
    @IsNotEmpty()
    @Prop({ required: true, min: 8 })
    password: string;

    @ApiProperty({
        description: "firstname of user",
        example: "pawit"
    })
    @IsNotEmpty()
    @Prop({ required: true })
    fname: string;

    @ApiProperty({
        description: "lastname of user",
        example: "Thongpramoon"
    })
    @IsNotEmpty()
    @Prop({ required: true })
    lname: string;

    @ApiProperty({
        description: "country of user",
        example: "Thailand"
    })
    @IsNotEmpty()
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: Country.name })
    country: Country
}

export const UserSchema = SchemaFactory.createForClass(User);