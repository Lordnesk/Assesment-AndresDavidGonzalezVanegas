import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateApointmentDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  hour: string;

  @IsString()
  @IsOptional()
  reason?: string;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  doctorId: number;
}