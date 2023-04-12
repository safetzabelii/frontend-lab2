

export interface LogIn {
    email: string;
    password: string;
  }
  export interface LogInResponseObject{
    id: string,
    email: string,
    roleId : number,
    token:string
  }