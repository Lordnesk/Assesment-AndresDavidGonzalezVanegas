import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request,Response } from "express";
import { AuthService } from "src/auth/auth.service";
import * as jwt from 'jsonwebtoken';
import { ManageError } from "src/errors/custom/custom.error";



@Injectable()
export class JwtGuard implements CanActivate{

    constructor(
        private AuthService:AuthService,
        private jwtService:JwtService
    ){}

    async canActivate(context: ExecutionContext):Promise<boolean> {
        const request:Request=context.switchToHttp().getRequest();
        const response:Response=context.switchToHttp().getResponse();

        const signedCookies=request.signedCookies;
        try{
            if(signedCookies || !signedCookies["acces_token"] || signedCookies["refresh_token"]){
                throw new ManageError({
                    type:"UNAUTHORIZED",
                    message:"THE TOKEN MUST BE PROVIDER"
                });
            }   
            await this.jwtService.verify(signedCookies["acces_token"]);
            request["user"]=await this.jwtService.decode(signedCookies["acces_token"]);

            return true;


        }catch(err:any){

            if(err instanceof jwt.TokenExpiredError){

                const newData=await this.AuthService.renovateToken(signedCookies["refresh_token"]);
                response.cookie("acces_token",newData.acces_token,{
                    signed:true,
                    httpOnly:true
                });
                request["user"]=newData.decodeToken;
                return true;
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