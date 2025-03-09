import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth2";
import { users } from "../auth.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  
    constructor(
        private configService: ConfigService
    ){
        super({
            callbackURL: configService.get<string | undefined>("google_callback_url") || "",
            clientID: configService.get<string>("google_client_id") || "",
            clientSecret: configService.get<string>("google_secret_id") || "",
            scope: ['email','profile']
        })
    }

    validate(accessToken: string, refreshToken: string,profile: any, done: VerifyCallback) {
        const user = users.find((user) => user.id === profile.id)
        if(!user){
           const newUser = {...profile}
           users.push(newUser)
           
           return newUser
           
        }
        return user
       
    }
    
}