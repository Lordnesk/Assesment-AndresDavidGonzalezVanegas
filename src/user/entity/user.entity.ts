
import { Appointment } from "src/apointment/entity/apointment.entity";
import { Role } from "src/role/entity/role.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    roleId:number;

    @ManyToOne(()=>Role, (role) =>role.user,{eager:true})
    role:Role;

    @OneToMany(() => Appointment, (appointment) => appointment.patient)
    appointments: Appointment[];
}