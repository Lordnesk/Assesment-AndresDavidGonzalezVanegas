import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apointment } from './entity/apointment.entity';
import { ApointmentsController } from './apointment.controller';
import { ApointmentService } from './apointment.service';


@Module({
  imports: [TypeOrmModule.forFeature([Apointment])],
  controllers: [ApointmentsController],
  providers: [ApointmentService],
})
export class ApointmentModule {}

