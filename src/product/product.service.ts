import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "src/schemas/product.schema";
import { Payload } from "src/static/interfaces";

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    // create product
    async addProduct(payload: Payload) {
        const { name, description } = payload
        const newProduct = await this.productModel.create({ name, description })
        return newProduct
    }

    // all products
    async allProducts() {
        return await this.productModel.find().select('-createdAt -updatedAt -__v')
    }

    // product By Id
    async productById(id: string) {
        const product = await this.productModel.findById(id).select("-createdAt -updatedAt -__v")
        return product
    }

    // update product By Id
    async updateProductById(id: string, payload: Payload) {
        const { name, description } = payload
        return await this.productModel.findByIdAndUpdate(id, { name, description }, { new: true }).select("-createdAt -updatedAt -__v")
    }

    // delete product By Id
    async deleteProductById(id: string) {
        return await this.productModel.findByIdAndDelete(id).select("-createdAt -updatedAt -__v")
    }
}
