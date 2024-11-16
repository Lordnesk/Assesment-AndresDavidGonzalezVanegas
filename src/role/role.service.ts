import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entity/role.entity';
import { ManageError } from 'src/errors/custom/custom.error';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ){}

  async create(createRoleDto: CreateRoleDto) {
    try{
      const existingRole = await this.roleRepository.findOneBy({ name: createRoleDto.name });
      if (existingRole) {
        throw new ManageError({
          type: "CONFLICT",
          message: `Role with name ${createRoleDto.name} already exists.`
        });
      }

      const role = this.roleRepository.create(createRoleDto);
      await this.roleRepository.save(role);

      return {
        message: `Role '${role.name}' has been created successfully.`,
        data: role, // Puedes devolver el rol creado si es necesario
      }

    }catch (err) {
      // Manejo de errores más claro
      if (err instanceof ManageError) {
        throw err; // Lanzamos el error personalizado si es del tipo ManageError
      }

      // Lanzar un error genérico si es otro tipo de error
      throw new ManageError({
        type: "INTERNAL_SERVER_ERROR",
        message: `An unexpected error occurred while creating the role: ${err.message || err}`,
      });
    }
  }

  async findAll() {
    try{
      const role:Role[] | null=await this.roleRepository.find();
      if(role.length==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE DOES NOT ROLES"
        });
      }
      return role;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async findOne(id: number) {
    try{
      const role:Role | null=await this.roleRepository.findOneBy({id});
      if(!role){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE DOES NOT ROLE WITH THIS ID"
        });
      }
      return role;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }


  async findOneByName(name: string) {
    try{
      const role:Role | null=await this.roleRepository.findOneBy({name});
      if(!role){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE DOES NOT ROLE WITH THIS NAME"
        });
      }
      return role;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try{
      const {affected}=await this.roleRepository.update(id,updateRoleDto);
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
      const {affected}=await this.roleRepository.delete(id);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO UPDATED"
        });
      }
      return "Perfectly Deleted";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }
}
