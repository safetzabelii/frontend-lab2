export interface ServerError<T=unknown>{
    statusCode: number;
    data?: T;
    errors?: string[] |null;
    message?:string|null;
}