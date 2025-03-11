import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './auth/configuration/configuration';
import * as dotenv from "dotenv"
dotenv.config()

@Module({
  imports: [forwardRef(() => AuthModule),ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ".env",
    load: [configuration]
  })],
  controllers: [AppController],
  providers: [AppService , {
    provide: "jwt-secret-key",
    useFactory: () => {
      const secret_key = process.env.secret_key as string;
      console.log(secret_key)
      return secret_key
    }
  }],
  exports: ['jwt-secret-key']
})
export class AppModule {}
