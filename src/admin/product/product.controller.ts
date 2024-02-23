import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductService } from "./product.service";
import { prepareSuccessResponse } from "utils/responseHandler";
import { throwError } from "utils/common/commonUtils";
import { Payload } from "src/static/interfaces";

@Controller('admin/product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    async addProduct(@Req() request: Request, @Body() payload: Payload, @Res() response: Response) {
        try {
            const responseData: Object = await this.productService.addProduct(payload);
            return response.send(prepareSuccessResponse(responseData, 'Product Added Successfully.'))
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) return throwError(response, `${Object.keys(error.keyValue)} must be unique.`)
            throwError(response, error.message)
        }
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    async allProducts(@Req() request: Request, @Res() response: Response) {
        try {
            const responseData: Object = await this.productService.allProducts();
            return response.send(prepareSuccessResponse(responseData, 'Fetch All Products Successfully.'))
        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send({ error });
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async productById(@Req() request: Request, @Res() response: Response, @Param('id') id: string) {
        try {
            const responseData = await this.productService.productById(id);
            return response.send(prepareSuccessResponse(responseData, 'Fetch Product Successfully.'));
        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send({ error });
        }
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateProductById(@Req() request: Request, @Body() payload: Payload, @Res() response: Response, @Param('id') id: string) {
        try {
            const product = await this.productService.productById(id);
            if (!product) return throwError(response, 'No product found with the given Id.');
            const responseData = await this.productService.updateProductById(id, payload);
            return response.send(prepareSuccessResponse(responseData, 'Product updated Successfully.'));
        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send({ error });
        }
    }
}
