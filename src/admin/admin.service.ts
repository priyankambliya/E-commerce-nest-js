import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
    loginAdmin(request ,response,user){
        if(!user){
            return response.status(401).send({message : "Auth failed"})
        }
        generateAccessToken(user)
        return {
            status:"true",
            accessToken:"at",
            refreshToken:"rt"
        };
    }
}
