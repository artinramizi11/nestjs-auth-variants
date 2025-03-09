import { Module, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuardJwt } from './guards/AuthGuardJwt.guard';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
    secret: "secret_key",
    signOptions: {expiresIn: "1h"}
  })],
  providers: [AuthService,LocalStrategy,JwtStrategy, {provide: APP_GUARD, useClass: AuthGuardJwt }],
  controllers: [AuthController],
})
export class AuthModule {}
