import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { GlobalModuleModule } from './global-module/global-module.module';
import AdminSeeder from './seeder/adminSeeder';

// const config = require( 'config' )

@Module({
  imports: [
    // MongooseModule.forRoot(config.get('LOCAL_DB_CONN_STRING'))
    MongooseModule.forRoot('mongodb+srv://priyankambliya:QdppldWdqgoohWqk@e-commerce-nestjs.onhrm6m.mongodb.net/E-commerce'),
    UserModule,
    AdminModule,
    GlobalModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
