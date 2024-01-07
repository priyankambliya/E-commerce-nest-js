import { Injectable } from '@nestjs/common';
import AdminServices from '../../services/adminService.helper'

@Injectable()
export class AdminService {
    async loginAdmin(request ,response,user){
        if(!user){
            return response.status(401).send({message : "Auth failed"})
        }
        const data = await AdminServices.generateAccessToken(user)
        
        return data
    }
}
