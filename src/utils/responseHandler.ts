import { Request,Response } from "express";
import { HttpStatus } from '@nestjs/common'

const successResponsehandler = (request:Request,response:Response,data:any,statusCode:HttpStatus) => {
    return response.status(statusCode).send(data)
}

const errorResponseHandler = (request:Request,response:Response,data:any,statusCode:HttpStatus) => {
    return response.status(statusCode).send(data)
}

export default {
    successResponsehandler,
    errorResponseHandler
}