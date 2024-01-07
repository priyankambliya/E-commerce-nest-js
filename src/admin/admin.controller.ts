import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import {Request,Response} from 'express'
import { AdminService } from './admin.service';
import { User } from 'src/schemas/user.schema';
import {AdminResponse} from 'DTO/AdminDTO/adminResponse.dto';
import {ALL_STATUS_CODES} from '../static/AppString.static'

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post()
    @HttpCode(200)
    loginAdmin(
        @Req() request:Request,
        @Body() user:User,
        @Res() response:Response
        ):void{
            try {
                const serviceResponse:AdminResponse =  this.adminService.loginAdmin(request ,response ,user);   
                response.send(
                    serviceResponse
                )  
            } catch (error) {
                response.status(ALL_STATUS_CODES.ERROR_CODES.NOT_ACCEPTABLE).send({
                    "error":error
                })
            } 
    }

}
