import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApointmentService } from './apointment.service';
import { CreateApointmentDto } from './dto/create-apointment.dto';
import { UpdateApointmentDto } from './dto/update-apointment.dto';

@Controller('apointments')
export class ApointmentsController {
  constructor(private readonly apointmentsService: ApointmentService) {}

  @Post()
  create(@Body() createApointmentDto: CreateApointmentDto) {
    return this.apointmentsService.create(createApointmentDto);
  }

  @Get()
  findAll() {
    return this.apointmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apointmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApointmentDto: UpdateApointmentDto) {
    return this.apointmentsService.update(+id, updateApointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apointmentsService.remove(+id);
  }
}

