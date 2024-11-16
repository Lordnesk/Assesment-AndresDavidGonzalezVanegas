import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserService } from "src/user/user.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private UserService: UserService 
    ){
        super({
            usernameField:"email",
            passwordField:"password"
        })
    }

    async validate(email:string,password:string){
        try{
            const verifyUser=await this.UserService.verifyUserByEmailAndPassword(email,password);
            const payloadToken={
                userId:verifyUser.id,
                email:verifyUser.email,
                role:verifyUser.role.name
            }
            return payloadToken;
        }catch(err:any){
            throw err;
        }
    }
}