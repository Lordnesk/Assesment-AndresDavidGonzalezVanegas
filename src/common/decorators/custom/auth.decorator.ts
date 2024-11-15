import { applyDecorators, UseGuards } from "@nestjs/common";
import { RoleGuard } from "src/auth/jwt/guards/role.guard";
import { roles } from "../roleDecorator/role.decorator";



export function Auth(...rolesAsigned:string[]){
    return applyDecorators(
        roles(...rolesAsigned),
        UseGuards(RoleGuard)
    )
}