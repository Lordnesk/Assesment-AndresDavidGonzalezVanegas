import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Role } from "src/role/entity/role.entity";
import { User } from "src/user/entity/user.entity";

import { Doctor } from "src/doctor/entity/doctor.entity";
import { Appointment } from "src/apointment/entity/apointment.entity";




@Injectable()
export class Credentials implements TypeOrmOptionsFactory{

    constructor(
        private configService:ConfigService
    ){}

    createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return({
            type: 'mysql',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_DATABASE'),
            entities: [
                Role,
                User,
                Appointment,
                Doctor
            ],
            synchronize: true,
        });
    }
}