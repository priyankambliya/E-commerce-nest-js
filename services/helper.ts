import * as Jwt from 'jsonwebtoken';
import { JwtAccessTokenRoles } from 'src/static/enums';
// import redisClient from '../src/static/Redis'

const config = require('config')

export async function generateAdminAccessToken({ _id, role }) {
    return await Jwt.sign({ adminId: _id, role }, config.get("JWT_ACCESS_SECRET"), { expiresIn: config.get("JWT_ACCESS_TIME") })
}

export async function generateUserAccessToken({ _id, role }) {
    return await Jwt.sign({ userId: _id, role }, config.get("JWT_ACCESS_SECRET"), { expiresIn: config.get("JWT_ACCESS_TIME") })
}

export async function verifyAdminAccessToken(token) {
    return await Jwt.verify(token, config.get("JWT_ACCESS_SECRET"))
}

async function generateAccessToken(payload: any) {
    const { _id, role, name } = payload;

    let accessToken = null
    if (name == JwtAccessTokenRoles.User) {
        accessToken = await generateUserAccessToken(payload)
    } else if (name == JwtAccessTokenRoles.Admin) {
        accessToken = await generateAdminAccessToken(payload)
    }
    return {
        accessToken: accessToken,
        [name]: _id,
        Role: role
    }
    // await redisClient.lpush( payload._id, JSON.stringify( data ) );
    // const dataList:any = await redisClient.lrange("1", 0, -1);
    // console.log({dataList})
    // const data1 = JSON.parse(dataList)
}

export default {
    generateAccessToken
}