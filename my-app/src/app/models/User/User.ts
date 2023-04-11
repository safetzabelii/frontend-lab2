import { EnumType } from "typescript";
import { Role } from "../Role/Role";

export interface User{
    id: string,
    name: string,
    surname: string,
    age: number,
    gender: EnumType,
    email: string,
    roleId : number,
    role: Role
}