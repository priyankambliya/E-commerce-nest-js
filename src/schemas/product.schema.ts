import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
    @Prop({
        unique: <any>[true, 'name must be unique'],
        required: [true, 'name is required'],
        trim: true,
        minlength: 2,
        maxlength: 25
    })
    name: string;

    @Prop({
        required: [true, 'product description is required'],
        trim: true,
        minlength: 2,
        maxlength: 25
    })
    description: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
