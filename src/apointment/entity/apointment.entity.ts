import { Doctor } from 'src/doctor/entity/doctor.entity';
import { User } from 'src/user/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  appointmentHour: string;

  @Column({ type: 'enum', enum: ['confirmed', 'cancelled', 'reprogramed'], default: 'confirmed' })
  state: 'confirmed' | 'cancelled' | 'reprogramed';

  @Column({ type: 'varchar', length: 255, nullable: true })
  reason: string;

  @ManyToOne(() => User, (user) => user.appointments, { eager: true })
  patient: User;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments , { eager: true })
  doctor: Doctor;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
