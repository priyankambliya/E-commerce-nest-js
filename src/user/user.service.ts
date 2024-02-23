import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express'
import { Model } from 'mongoose';
import Helper from 'services/helper';
import { User } from 'src/schemas/user.schema';
import { JwtAccessTokenRoles } from 'src/static/enums';
import { throwError } from 'utils/common/commonUtils';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    // register user
    async registerUser(payload: any) {
        const { nickName, email, password } = payload
        return await this.userModel.create({ nickName, email, password })
    }

    // login user
    async loginUser(request: Request, payload: any, response: Response) {
        const { email, password } = payload;
        const user = await this.userModel.findOne({ email })
        if (!user) return throwError(response, 'This email is not registered.', 409)
        if (password !== user.password) throwError(response, 'Password miss match', 401)

        return await Helper.generateAccessToken({ _id: user._id, role: 'user', name: JwtAccessTokenRoles.User })
    }
}
