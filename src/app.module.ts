import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

const config = require('config')

@Module({
  imports: [
    MongooseModule.forRoot(config.get('LOCAL_DB_CONN_STRING'))
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
