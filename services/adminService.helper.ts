import * as Jwt from 'jsonwebtoken';
// import redisClient from '../src/static/Redis'

const config = require('config')

async function generateAdminAccessToken({ adminId, role }) {
    const accessToken = await Jwt.sign({ adminId, role }, config.get("JWT_ACCESS_SECRET"), { expiresIn: config.get("JWT_ACCESS_TIME") })
    return accessToken;
}

async function generateAccessToken(payload: any) {
    const { _id, role } = payload;
    const accessToken = await generateAdminAccessToken({ adminId: _id, role })
    const data = {
        accessToken: accessToken,
        adminId: _id,
        adminRole: role
    }
    // await redisClient.lpush( payload._id, JSON.stringify( data ) );
    // const dataList:any = await redisClient.lrange("1", 0, -1);
    // console.log({dataList})
    // const data1 = JSON.parse(dataList)
    return data
}

export default {
    generateAccessToken
}