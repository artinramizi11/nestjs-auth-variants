import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies?.jwt]),
            secretOrKey: "secret_key"
        })
    }


    validate(payload: any) {
        return {userId: payload.sub, email: payload.email}
    }
}