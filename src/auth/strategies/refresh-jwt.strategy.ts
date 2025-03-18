import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { JwtPayload } from "src/jwt-payload.type";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy,"refresh-jwt"){

    constructor(
        private configService: ConfigService,
        private authService: AuthService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("jwt_refresh_key") as string
        })
    }

    async validate(payload: JwtPayload) {
        return payload
    }
    
}