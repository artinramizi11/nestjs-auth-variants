import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, Res, Session, SetMetadata, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthService, users } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { OwnershipGuard } from './guards/ownership.guard';
import { LogginInterceptor } from './loggin.interceptor';
import { Roles } from './roles.metadata';
import { AuthorizationGuard } from './guards/authorization.guard';
import { AuthGuardJwt } from './guards/AuthGuardJwt.guard';
import { CreateUserDto } from './create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Get()
    @SetMetadata("public",true)
    get(@Session() session){
        return session
    }

    @Get("test-session")
    @SetMetadata("public",true)
    test(@Session() session){
        return session
    }


    @Post('login')
    @SetMetadata("public",true)
    @UseInterceptors(LogginInterceptor)
    @UseGuards(AuthGuard("local"))
    login(@Req() req){
        return this.authService.login(req.user.id)
    }

    @Get("profile")
    @UseInterceptors(LogginInterceptor)
    getProfile(@Req() req){
        return this.authService.findUserById(req.user.userId)
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
