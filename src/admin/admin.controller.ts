import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AdminService } from './admin.service';
import { User } from 'src/schemas/user.schema';
import { prepareSuccessResponse } from 'utils/responseHandler';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginAdmin(@Req() request: Request, @Body() user: User, @Res() response: Response) {
    try {
      const serviceResponse = await this.adminService.loginAdmin(request, response, user);
      return response.send(prepareSuccessResponse(serviceResponse, '관리자 로그인 성공'));
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).send({ error });
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async registerAdmin(@Req() request: Request, @Body() user: User, @Res() response: Response) {
    try {
      const data = await this.adminService.registerAdmin(request, response, user);
      return response.send(prepareSuccessResponse(data, 'Admin registered Successfully.'));
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).send({ error });
    }
  }
}
