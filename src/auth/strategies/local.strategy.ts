import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,'local') {

    constructor(
        private authService: AuthService
    ){
        super({
            usernameField: "email",
            passwordField: "password"
        })
    }

    validate(email: string,password: string) {
      const user = this.authService.validateUser(email,password)
      if(!user){
        throw new HttpException("User validation failed",HttpStatus.BAD_REQUEST)
      }
      return user
    }
    
}