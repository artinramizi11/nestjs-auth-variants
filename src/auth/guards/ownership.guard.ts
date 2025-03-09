import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class OwnershipGuard implements CanActivate {
    constructor(
        private authService: AuthService
    ){}
     canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const user = this.authService.findUserById(request.user.userId)
        const userIdParam = request.params.id;

        const isOwner = user.id === Number(userIdParam)

        if(isOwner){
            return true 
        }

        throw new HttpException("You are not owner of this user to get access", HttpStatus.UNAUTHORIZED)
        
    }
}