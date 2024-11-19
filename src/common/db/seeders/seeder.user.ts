import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from 'src/user/entity/user.entity'; // Asegúrate de que la ruta sea correcta
import { Role } from 'src/role/entity/role.entity'; // Asegúrate de que la ruta sea correcta
import * as bcrypt from 'bcrypt';
import { Seeder } from 'typeorm-extension';


interface UserDTO {
  email: string;
  password: string;
  name: string;
  roleId: number;
}

@Injectable()
export class SeederUser implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);

    const users: UserDTO[] = [
      { email: 'doctor@example.com', password: 'doctorpassword', name: 'Dr. John Doe', roleId:1 },
      { email: 'patient@example.com', password: 'patientpassword', name: 'Jane Doe', roleId: 2 }
    ];

    for (const user of users) {
      const existingUser = await userRepository.findOneBy({ email: user.email });
      if (!existingUser) {
        // Encriptar la contraseña antes de crear el usuario
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = userRepository.create(user);
        await userRepository.save(newUser);
        console.log(`User ${user.email} seeded successfully!`);
      }
    }
  }
}
