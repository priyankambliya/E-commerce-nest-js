import * as Jwt from 'jsonwebtoken';

const config = require('config')

async function generateAdminAccessToken({adminId,role}){
    const accessToken = await Jwt.sign({ adminId, role }, config.get("JWT_ACCESS_SECRET"), { expiresIn: config.get("JWT_ACCESS_TIME") })
}

function generateAccessToken (payload:any) {
    const { _id,role } = payload

}