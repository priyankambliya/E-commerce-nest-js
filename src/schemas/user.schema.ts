import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AdminRole } from 'DTO/AdminDTO/adminTypes';
import { Document } from 'mongoose';
import { model } from 'mongoose';

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
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'],
  })
  email: string;

  @Prop({
    required: [true, 'Password is required'],
    minlength: 6
  })
  password: string;

  @Prop({
    default: AdminRole.SUPER_ADMIN,
  })
  role: AdminRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const USER = model<UserDocument>('User', UserSchema);
