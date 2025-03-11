import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import path from "path";
import { timestamp } from "rxjs";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const request = ctx.getRequest()
        const status = exception.getStatus()
        const errormessage = exception.response
    
        response.status(status).json({
            statusCode: status,
            errorMessage: errormessage,
            timestamp: new Date().toISOString(),
            path: request.url
        })
    }
}