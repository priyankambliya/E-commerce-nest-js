import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "src/schemas/product.schema";
import { APP_FILTER } from '@nestjs/core';
import { ForbiddenExceptionFilter } from 'utils/errors/ForbiddenExceptionFilter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: APP_FILTER,
      useClass: ForbiddenExceptionFilter
    }
  ]
})
export class ProductModule { }
