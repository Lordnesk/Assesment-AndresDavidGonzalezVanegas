import { SetMetadata } from "@nestjs/common";


export const KEY_ROLES="patient, doctor";
export const roles=(...roles:string[])=>SetMetadata(KEY_ROLES,roles);