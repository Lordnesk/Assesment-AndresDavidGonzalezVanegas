import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './jwt/strategy/local.strategy';
import { LocalGuard } from './jwt/guards/local.guard';
import { JwtGuard } from './jwt/guards/jwt.guard';
import { RoleGuard } from './jwt/guards/role.guard';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    PassportModule,
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async(configService:ConfigService)=>({
        secret:configService.get<string>("JWT_SECRET")
      })
    })
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    LocalGuard,
    JwtGuard,
    AuthService,
    RoleGuard
  ],
  exports:[
    JwtGuard,
  ]
})
export class AuthModule {}
