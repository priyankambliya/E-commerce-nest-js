import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express'
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';
import { prepareSuccessResponse } from 'utils/responseHandler';
import { throwError } from 'utils/common/commonUtils';

@Controller('')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async registerUser(@Req() request: Request, @Body() payload: User, @Res() response: Response) {
        try {
            const responseData = await this.userService.registerUser(payload);
            return response.send(prepareSuccessResponse(responseData, 'User registered Successfully.'));
        } catch (error) {
            if (error.code === 11000 || error.code === 11001) return throwError(response, `${Object.keys(error.keyValue)} Already used.`)
            response.status(HttpStatus.BAD_REQUEST).send({ error });
        }
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async loginUser(@Req() request: Request, @Body() payload: User, @Res() response: Response) {
        try {
            const responseData = await this.userService.loginUser(request, payload, response);
            return response.send(prepareSuccessResponse(responseData, 'User Login Successfully.'));
        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send({ error });
        }
    }
}
