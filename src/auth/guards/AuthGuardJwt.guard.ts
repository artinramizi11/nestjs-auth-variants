import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class AuthGuardJwt extends AuthGuard('jwt'){
    constructor(
        private reflector: Reflector
    ){
        super()
    }

    canActivate(context: ExecutionContext){
       const jwtNotIncluded = this.reflector.getAllAndOverride("dontincludejwt", [context.getHandler(),context.getClass()])
        if(jwtNotIncluded){
            return true 
        }

        return super.canActivate(context)
    
    }  
    
}