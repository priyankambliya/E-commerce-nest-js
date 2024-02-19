import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({
    required: [true, 'nickName is required'],
    trim: true,
    minlength: 3,
    maxlength: 50
  })
  nickName: string;

  @Prop({
    unique: <any>[true, 'Email must be unique'],
    trim: true,
    lowercase: true,
    required: [true, 'Email is required'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format']
  })
  email: string;

  @Prop({
    required: [true, 'Password is required'],
    minlength: 6
  })
  password: string;

  @Prop({
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    validate: {
      validator: function (v) {
        return this.role !== 'admin' || this.constructor.countDocuments({ role: 'admin' }).exec().then(count => count < 2);
      },
      message: 'Only two admin users are allowed.'
    }
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
