import { Module } from '@nestjs/common';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';
import { SeederRole } from './seeder.role';
import { SeederUser } from './seeder.user';

@Module({
  imports: [RoleModule, UserModule],
  providers: [SeederRole, SeederUser],
  exports: [SeederRole, SeederUser],
})
export class SeederModule {}