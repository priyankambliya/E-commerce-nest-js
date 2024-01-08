import { AdminRole } from 'DTO/AdminDTO/adminTypes';
import { AppString } from '../static/AppString.static';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

const config = require('config');

class AdminSeeder {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}

  async seedAdmin() {
    try {
      const superAdmin = await this.UserModel.findOne({
        role: AdminRole.SUPER_ADMIN,
      });

      if (superAdmin) {
        console.log(AppString.ADMIN_EXIST);
      } else {
        const bcryptedPassword = await bcrypt.hash(
          config.get('SUPER_ADMIN_PASSWORD'),
          config.get('saltOrRounds'),
        );
        await this.UserModel.create({
          nickName: 'admin',
          email: config.get('SUPER_ADMIN_EMAIL'),
          password: bcryptedPassword,
        });
        console.log(AppString.ADMIN_ADDED);
      }
    } catch (error) {
      console.error('Error during seedAdmin operation:', error);
    }
  }
}

export default AdminSeeder;
