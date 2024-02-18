import { HttpStatus, Injectable } from '@nestjs/common';
import AdminServices from '../../services/adminService.helper'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { throwError } from 'utils/common/commonUtils';

@Injectable()
export class AdminService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  // LOGIN USER //
  async loginAdmin(request: any, response: any, user: any) {
    if (!user) {
      return response.status(401).send({ message: "Auth failed" })
    }
    const data = await AdminServices.generateAccessToken(user)

    return data
  }

  // REGISTER USER //
  async registerAdmin(request: any, response: any, user: any) {
    const { nickName, email, password } = user
    if (!user) {
      return response.status(401).send({ message: "User Not found." })
    }

    const userByEmail = await this.userModel.findOne({ email: user.email })
    if (userByEmail) throwError(response, 'user already exist with this email.', HttpStatus.CONFLICT)
    const newUser = await this.userModel.create({ nickName, email, password })
    return newUser
  }
}
