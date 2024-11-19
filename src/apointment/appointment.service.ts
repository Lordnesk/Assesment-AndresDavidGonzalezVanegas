import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
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
    const { date, hour, userId, doctorId } = dto;

    // Verificar si ya existe una cita con el mismo doctor y hora
    const conflictingAppointment = await this.appointmentRepository.findOne({
      where: {
        date,
        appointmentHour: hour,
        doctor: { id: doctorId },
      },
    });

    if (conflictingAppointment) {
      throw new Error(
        `The doctor already has an appointment on ${date} at ${hour}`,
      );
    }

    // Crear y guardar la nueva cita
    const newAppointment = this.appointmentRepository.create(dto);
    return this.appointmentRepository.save(newAppointment);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({ relations: ['patient', 'doctor'] });
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({ where: { id }, relations: ['patient', 'doctor'] });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async update(id: number, dto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findOne(id);

    // Validar conflicto de horario solo si se cambian `date` o `hour`
    if (dto.date || dto.hour || dto.doctorId) {
      const { date, hour, doctorId } = { ...appointment, ...dto };

      const conflictingAppointment = await this.appointmentRepository.findOne({
        where: {
          date,
          appointmentHour: hour,
          doctor: { id: doctorId },
          id: Not(id), // Excluir la cita actual de la validación
        },
      });

      if (conflictingAppointment) {
        throw new Error(
          `The doctor already has an appointment on ${date} at ${hour}`,
        );
      }
    }

    // Actualizar y guardar la cita
    this.appointmentRepository.merge(appointment, dto);
    return this.appointmentRepository.save(appointment);
  }

  async remove(id: number): Promise<void> {
    const appointment = await this.findOne(id);
    await this.appointmentRepository.remove(appointment);
  }
}


