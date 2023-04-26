import { Role } from "../Role/Role";

export interface User{
    id: string,
    name: string,
    surname: string,

    email: string,
    roleId : number,
    role: Role,
}