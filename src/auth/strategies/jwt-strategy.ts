import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {


    constructor(
        @Inject("jwt-secret-key") private readonly JwtSecretKey: string
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JwtSecretKey
        })
    }


    validate(payload: any) {
        console.log(this.JwtSecretKey)
        return {id: payload.id, email: payload.email}
    }
}