import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, ForbiddenException } from '@nestjs/common';
import { Response } from 'express';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
    catch(exception: ForbiddenException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = HttpStatus.FORBIDDEN;

        response.status(status).send({
            message: 'You do not have permission to access this API.',
            // error: 'Forbidden',
            // statusCode: status,
        });
    }
}
