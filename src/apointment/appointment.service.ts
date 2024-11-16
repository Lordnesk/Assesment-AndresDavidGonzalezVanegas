import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entity/apointment.entity';
import { CreateAppointmentDto } from './dto/create-apointment.dto';
import { UpdateAppointmentDto } from './dto/update-apointment.dto';



@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async create(dto: CreateAppointmentDto): Promise<Appointment> {
    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        date: dto.date,
        appointmentHour: dto.hour,
        patient: { id: dto.userId },
        doctor: { id: dto.doctorId },
      },
    });

    if (existingAppointment){
      alert(
        "There's already an appointment with this doctor at this hour "
      )
    }

    const newAppointment = this.appointmentRepository.create(dto);
    return this.appointmentRepository.save(newAppointment);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async update(id: number, dto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findOne(id);
    this.appointmentRepository.merge(appointment, dto);
    return this.appointmentRepository.save(appointment);
  }

  async remove(id: number): Promise<void> {
    const appointment = await this.findOne(id);
    await this.appointmentRepository.remove(appointment);
  }
}

