import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Apointment } from 'src/apointment/entity/apointment.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  speciality: string;

  @OneToMany(() => Apointment, (apointment) => apointment.doctor)
  apointments: Apointment[];
}
