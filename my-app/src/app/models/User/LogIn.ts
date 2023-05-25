

export interface LogIn {
    email: string;
    password: string;
  }
  export interface LogInResponseObject{
    id: string,
    email: string,
    name: string,
    role : string,
    token:string,
    stripeCustomerId?:string,
  }