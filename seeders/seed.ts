import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { User } from "src/schemas/user.schema"

const config = require('config')

export class Seeders {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    seedAdmin = async () => {
        const isAdmin = await this.userModel.findOne({ email: config.get('ADMIN_EMAIL'), role: { $eq: 'admin' } })
        if (!isAdmin) await this.userModel.create({ nickName: 'admin', email: config.get('ADMIN_EMAIL'), password: config.get('ADMIN_PASSWORD'), role: 'admin' })
        console.log('   🔒ADMIN SEEDED')
    }
}