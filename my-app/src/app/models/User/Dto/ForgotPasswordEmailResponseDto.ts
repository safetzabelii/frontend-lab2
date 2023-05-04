

export interface ForgotPasswordEmailResponseDto{
    userId: string,
    encryptedToken: string,
    key:string,
    iv:string
}