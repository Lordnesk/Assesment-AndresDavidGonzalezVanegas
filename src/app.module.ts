import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credentials } from './common/db/db.config';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from './common/db/seeders/seeders.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:".env"
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useClass:Credentials
    }),
    RoleModule,
    UserModule,
    AuthModule,
    SeederModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
