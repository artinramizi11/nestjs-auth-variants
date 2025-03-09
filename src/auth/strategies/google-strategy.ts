import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { error } from "console";
import { Strategy, VerifyCallback } from "passport-google-oauth2";
import { users } from "../auth.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  
    constructor(){
        super({
            callbackURL: "http://localhost:3000/auth/google/redirect",
            clientID: "228295168912-rcq73t358m57h0js3ff67pq79mr3g6hf.apps.googleusercontent.com",
            clientSecret: "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",
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