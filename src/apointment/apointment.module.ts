import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entity/apointment.entity';
import { AppointmentsController } from './appointment.controller';
import { AppointmentService } from './appointment.service';


@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  controllers: [AppointmentsController],
  providers: [AppointmentService],
})
export class AppointmentModule {}

