import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuardJwt extends AuthGuard('jwt'){
    constructor(
        private reflector: Reflector
    ){
        super()
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>("public",[context.getHandler(),context.getClass()])
        if(isPublic){
            return true 
        }

        return super.canActivate(context)
    
    }
    
}