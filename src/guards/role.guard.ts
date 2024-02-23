import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verifyAdminAccessToken } from 'services/helper';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const authHeader = request?.headers?.authorization
        const token = authHeader.split(' ')[1]
        const decodedData: any = await verifyAdminAccessToken(token)

        const role = decodedData.role

        return requiredRoles.includes(role);
    }
}
