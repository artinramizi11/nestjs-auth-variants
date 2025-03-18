import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthGuardJwt } from './guards/AuthGuardJwt.guard';
import { GoogleStrategy } from './strategies/google-strategy';
import {  ConfigModule, ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './exceptions/http-exception.catch';
import { AppModule } from 'src/app.module';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';



@Module({
  imports: [
    forwardRef(() => AppModule),PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>("jwt_secret_key") as string,
      })
    })],
  
  providers: [AuthService,LocalStrategy,JwtStrategy, {provide: APP_GUARD, useClass: AuthGuardJwt },GoogleStrategy,ConfigService, 
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },RefreshJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
