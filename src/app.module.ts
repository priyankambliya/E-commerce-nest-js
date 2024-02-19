import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { Seeders } from "seeders/seed";
import { UserSchema } from "./schemas/user.schema";

const config = require('config')

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb+srv://priyankambliya:QdppldWdqgoohWqk@e-commerce-nestjs.onhrm6m.mongodb.net/E-commerce'),
    MongooseModule.forRoot(config.get('DB_CONN_LONG_STRING')),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UserModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, Seeders],
})
export class AppModule { }
