export interface ServerError{
    statusCode: number;
    data?: string;
    errors?: string[] |null;
}