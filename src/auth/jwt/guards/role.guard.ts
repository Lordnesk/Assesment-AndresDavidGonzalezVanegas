import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { KEY_ROLES } from "src/common/decorators/roleDecorator/role.decorator";
import { ManageError } from "src/errors/custom/custom.error";



@Injectable()
export class RoleGuard implements CanActivate{
    
    constructor(
        private reflector:Reflector
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const roles=this.reflector.get(KEY_ROLES,context.getHandler());
        const request:Request=context.switchToHttp().getRequest();
        const dataUser:any=request["patient"];

        if(!roles.includes(dataUser.role)){
            throw new ManageError({
                type:"UNAUTHORIZED",
                message:"YOU ROLE NO IS VALID HERE"
            });
        }
        return true;
    }
}