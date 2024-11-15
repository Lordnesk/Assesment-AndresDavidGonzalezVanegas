import { Module } from '@nestjs/common';
import { RoleController } from './role/role.controller';
import { RoleModule } from './role/role.module';
import { ApointmentService } from './apointment/apointment.service';
import { ApointmentsController } from './apointment/apointment.controller';
import { ApointmentModule } from './apointment/apointment.module';

@Module({
  imports: [RoleModule, ApointmentModule],
  controllers: [RoleController, ApointmentsController],
  providers: [ApointmentService],
})
export class AppModule {}
