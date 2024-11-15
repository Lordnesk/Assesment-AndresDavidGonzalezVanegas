import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApointmentDto } from './dto/create-apointment.dto';
import { UpdateApointmentDto } from './dto/update-apointment.dto';
import { Apointment } from './entity/apointment.entity';


@Injectable()
export class ApointmentService {
  constructor(
    @InjectRepository(Apointment)
    private readonly apointmentRepository: Repository<Apointment>,
  ) {}

  async create(dto: CreateApointmentDto): Promise<Apointment> {
    const newApointment = this.apointmentRepository.create(dto);
    return this.apointmentRepository.save(newApointment);
  }

  async findAll(): Promise<Apointment[]> {
    return this.apointmentRepository.find();
  }

  async findOne(id: number): Promise<Apointment> {
    const apointment = await this.apointmentRepository.findOne({ where: { id } });
    if (!apointment) {
      throw new NotFoundException(`Apointment with ID ${id} not found`);
    }
    return apointment;
  }

  async update(id: number, dto: UpdateApointmentDto): Promise<Apointment> {
    const apointment = await this.findOne(id);
    this.apointmentRepository.merge(apointment, dto);
    return this.apointmentRepository.save(apointment);
  }

  async remove(id: number): Promise<void> {
    const apointment = await this.findOne(id);
    await this.apointmentRepository.remove(apointment);
  }
}

