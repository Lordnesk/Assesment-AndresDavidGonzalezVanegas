import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/common/decorators/custom/auth.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  /* @Auth("doctor")   */
  findAll() {
    try {
      return this.userService.findAll();
    } catch (error) {
      return {message: "Not working", error: error}
    }
    
  }

  @Get(':date/:speciality/:reason')
  @Auth("doctor","patient")
  findOne(
    @Param('date') date: string, 
    @Param('speciality') speciality: string, 
    @Param('reason') reason: string 
    ) {
    return this.userService.findOne(+date);
  }

  @Patch(':id')
  @Auth("doctor","patient")
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Auth("doctor")
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
