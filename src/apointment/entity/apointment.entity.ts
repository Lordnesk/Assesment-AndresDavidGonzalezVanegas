import { Doctor } from 'src/doctor/entity/doctor.entity';
import { User } from 'src/user/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('apoitments')
export class Apointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  apointmentHour: string;

  @Column({ type: 'enum', enum: ['confirmed', 'cancelled', 'reprogramed'], default: 'confirmed' })
  state: 'confirmed' | 'cancelled' | 'reprogramed';

  @Column({ type: 'varchar', length: 255, nullable: true })
  reason: string;

  @ManyToOne(() => User, (user) => user.apointments, { eager: true })
  patient: User;

  @ManyToOne(() => Doctor, (doctor) => doctor.apointments , { eager: true })
  doctor: Doctor;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
