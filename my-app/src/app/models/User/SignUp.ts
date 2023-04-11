import { EnumType } from "typescript";

export interface SignUp{
    name:string,
    surname: string,
    age: number,
    gender: EnumType,
    email: string,
    password: string,
    roleId: number
}