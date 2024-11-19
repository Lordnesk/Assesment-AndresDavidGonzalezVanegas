import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleService } from 'src/role/role.service';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import { Role } from 'src/role/entity/role.entity';
import { ManageError } from 'src/errors/custom/custom.error';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { roleName, password, ...userData } = createUserDto;

    // Buscar el rol directamente por nombre
    const role = await this.roleService.findOneByName(roleName);
    if (!role) {
      throw new ManageError({
        type: 'NOT_FOUND',
        message: `Role with name ${roleName} not found`,
      });
    }

    // Hashear la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario con el rol asignado y la contraseña hasheada
    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      roleId: role.id, // Aseguramos que roleId se asigne correctamente
      role: role
    });

    // Guardar el usuario en la base de datos
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (!users.length) {
      throw new ManageError({
        type: 'NOT_FOUND',
        message: 'No users found',
      });
    }
    return users;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new ManageError({
        type: 'NOT_FOUND',
        message: `User with ID ${id} not found`,
      });
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async verifyUserByEmailAndPassword(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ManageError({
        type: 'NOT_FOUND',
        message: 'Invalid credentials',
      });
    }
    return user;
  }
}

