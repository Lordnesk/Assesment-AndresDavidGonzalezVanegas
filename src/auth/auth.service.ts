import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { ManageError } from 'src/errors/custom/custom.error';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(
        private jwtService:JwtService,
        private userService: UserService,
    ){}

    async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;
    const userExists = await this.userService.findByEmail(email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create({
        email,
        password: hashedPassword,
        name,
        roleName : ""
    });

    return this.generateToken(newUser);
  }

  private generateToken(user) {
    const payload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    return { accessToken };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.verifyUserByEmailAndPassword(email, password);
    return this.creationOfToken(user);
  }

    async creationOfToken(data:any){
        const acces_token=this.jwtService.sign(data,{expiresIn:'10m'});
        const refresh_token=this.jwtService.sign(data,{expiresIn:'1h'});

        return {acces_token,refresh_token}
    }

    async renovateToken(refresh_token:string){
        try{
            await this.jwtService.verify(refresh_token);

            const decodeToken=await this.jwtService.decode(refresh_token);
            delete decodeToken.iat;
            delete decodeToken.exp;

            return {
                decodeToken,
                acces_token:this.jwtService.sign(decodeToken)

            }
        }catch(err:any){
            if(err instanceof jwt.TokenExpiredError){
                throw new ManageError({
                    type:"UNAUTHORIZED",
                    message:"THE TOKEN HAVE EXPIRED"
                });
            }
            else if(err instanceof jwt.JsonWebTokenError || jwt.NotBeforeError){
                throw new ManageError({
                    type:"UNAUTHORIZED",
                    message:"THE TOKEN IS NOT VALID"
                });
            }
            throw ManageError.signedError(err.message);
        }
    }
}