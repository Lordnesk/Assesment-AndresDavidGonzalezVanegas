import {IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateAppointmentDto {
    @IsEnum(['confirmed', 'cancelled', 'reprogramed'], { message: 'State needs to be confirmed, cancelled or reprogramed' })
    @IsOptional()
    state?: 'confirmed' | 'cancelled' | 'reprogramed';
  
    @IsString()
    @IsOptional()
    reason?: string;
  }