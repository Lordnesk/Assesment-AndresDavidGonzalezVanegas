import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @Post("login")
  async createToken(@Body() data:any){
    return await this.authService.creationOfToken(data);
  }
}