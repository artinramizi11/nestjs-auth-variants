import { Body, Controller, ForbiddenException, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Req, Res, Session, SetMetadata, UseFilters, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthService, users } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { OwnershipGuard } from './guards/ownership.guard';
import { Roles } from './roles.metadata';
import { AuthorizationGuard } from './guards/authorization.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LogginInterceptor } from './interceptor/loggin.interceptor';
import { ConfigService } from '@nestjs/config';
import { DontIncludeJwt } from './jwt-not-included.metadata';

@UseInterceptors(LogginInterceptor)
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
        private configService: ConfigService
    ){}


    @Get()
    get(){
      return "hello"
    }

    @Get("google")
    @DontIncludeJwt()
    @UseGuards(AuthGuard("google"))
    loginWithGoogle(){
        return "login with google"
    }

    @Get("google/redirect")
    @DontIncludeJwt()
    @UseGuards(AuthGuard("google"))
    async getInformation (@Req() req){
        const user = req.user
        const payload = {id: user.id};
        const token = this.jwtService.sign(payload, {secret: this.configService.get("jwt_secret_key")})
        return {
           user,
           token
        }
    }

    @Get("google/information")
    getGoogleInformation(@Req() req){
        return this.authService.findUserById(req.user.id)
    }


    @Post('login')
    @SetMetadata("public",true)
    @UseGuards(AuthGuard("local"))
    @DontIncludeJwt()
    login(@Req() req){
        return this.authService.login(req.user.id)
    }

    @Post("refresh")
    @UseGuards(AuthGuard("refresh-jwt"))
    @DontIncludeJwt()
    refreshToken(@Req() req){
        return this.authService.refreshToken(req.user.sub)
    }
    
    @Get("profile")
    @UseInterceptors(LogginInterceptor)
    getProfile(@Req() req){
        console.log(req.user)
        return this.authService.findUserById(req.user.id)
    }

    @Post("create-user")
    @SetMetadata("public",true)
    createUser(@Body(new ValidationPipe()) user: CreateUserDto){
        return this.authService.createUser(user)

    }

    @Get("users")
    @Roles(["admin"])
    @UseGuards(AuthorizationGuard)
    getUsers(){
        return users
    }

    @Get("users/:id")
    @UseGuards(OwnershipGuard)
    getUserById(@Param("id",ParseIntPipe) id: number){
        return this.authService.findUserById(id)
    }
}
