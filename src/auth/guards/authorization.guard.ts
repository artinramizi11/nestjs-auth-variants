import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private reflector: Reflector
    ){}
     canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const userId = request.user.id;
        const user = this.authService.findUserById(Number(userId))
        const requiredRoles = this.reflector.getAllAndOverride<string[]>("roles", [context.getHandler(),context.getClass()])

        const hasRole = requiredRoles.every((role) => user.role.includes(role))
        
        if(hasRole){
            return true
        }
        throw new HttpException("You dont have the role for this action",HttpStatus.UNAUTHORIZED)
    }
}