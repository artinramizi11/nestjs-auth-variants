import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "src/jwt-payload.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {


    constructor(
        private configService: ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("jwt_secret_key") as string,
            ignoreExpiration: false
        })
    }


    validate(payload: JwtPayload) {
      return {id: payload.sub, email: payload.email}
        
    }
}