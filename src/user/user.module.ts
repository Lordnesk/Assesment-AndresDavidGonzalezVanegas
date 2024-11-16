import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/role/role.module';
import { User } from './entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    RoleModule,
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[
    TypeOrmModule,
    UserService
  ]
})
export class UserModule {}

