import { HttpStatus, Injectable } from '@nestjs/common';
import Helper from '../../services/helper'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { throwError } from 'utils/common/commonUtils';
import { JwtAccessTokenRoles } from 'src/static/enums';

@Injectable()
export class AdminService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  // LOGIN USER //
  async loginAdmin(request: any, response: any, user: any) {
    const isExist = await this.userModel.findOne({ email: user.email })
    if (!isExist) return throwError(response, "Email or password is incorrect", HttpStatus.BAD_REQUEST);
    const data = await Helper.generateAccessToken({ _id: isExist._id, role: 'admin', name: JwtAccessTokenRoles.Admin })
    return data
  }

  // // REGISTER USER //
  // async registerAdmin(request: any, response: any, user: any) {
  //   const { nickName, email, password } = user
  //   if (!user) {
  //     return response.status(401).send({ message: "User Not found." })
  //   }

  //   const userByEmail = await this.userModel.findOne({ email: user.email })
  //   if (userByEmail) throwError(response, 'user already exist with this email.', HttpStatus.CONFLICT)
  //   const newUser = await this.userModel.create({ nickName, email, password })
  //   return newUser
  // }
}
