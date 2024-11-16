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
    private userRepository:Repository<User>,
    private roleService:RoleService
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      // Buscar el rol por nombre
      const role: Role = await this.roleService.findOneByName(createUserDto.roleName);
      
      // Verificar si el rol existe
      if (!role) {
        throw new ManageError({
          type: 'NOT_FOUND',
          message: `Role with name ${createUserDto.roleName} not found`,
        });
      }
  
      // Eliminar el campo roleName antes de crear el usuario
      delete createUserDto.roleName;
  
      // Crear el usuario con el rol asignado
      const dataUser = this.userRepository.create({
        roleId: role.id, // Asociamos el rol al usuario
        ...createUserDto,
      });
  
      // Guardar el nuevo usuario
      await this.userRepository.save(dataUser);
  
      // Retornar el usuario creado
      return dataUser;
    } catch (err: any) {
      // Lanza el error con un mensaje detallado
      throw new ManageError({
        type: 'INTERNAL_SERVER_ERROR',
        message: `Error creating user: ${err.message}`,
      });
    }
  }
  

  async findAll() {
    try{
      const users:User[] | null= await this.userRepository.find();
      if(users.length==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE ARE NOT USERS"
        });
      }
      return users;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOne(id: number) {
    try{
      const user:User | null= await this.userRepository.findOneBy({id});
      if(!user){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THIS ID NOT EXIST"
        });
      }
      return user;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try{
      const {affected}=await this.userRepository.update(id,updateUserDto);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO UPDATED"
        });
      }
      return "Perfectly updated";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try{
      const {affected}=await this.userRepository.delete(id);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO DELETED"
        });
      }
      return "Perfectly deleted";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }


  async verifyUserByEmailAndPassword(email:string,password:string){
    try{
      const findUser=await this.userRepository.findOneBy({email:email});
      
      if(!findUser || (!await bcrypt.compare(password,findUser.password))){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THIS USER NOT EXIST"
        });
      }
      return findUser;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

}
