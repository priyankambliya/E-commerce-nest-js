import { Injectable } from '@nestjs/common';
import AdminServices from '../../services/adminService.helper';
import { AppString } from '../static/AppString.static';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async loginAdmin(request, response, user) {
    const allAdmin = await this.userModel.find();
    console.log({ allAdmin });
    if (!user) {
      return response.status(401).send({ message: AppString.AUTH_FAILED });
    }
    const data = await AdminServices.generateAccessToken(user);
    return data;
  }
}
