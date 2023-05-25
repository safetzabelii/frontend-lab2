
export interface PaymentIntent {
    amount: number;
    currency: string;
    description:string;
    deliveryAddress:string;
    stripeCustomerId:string;
    paymentMethod:string;
}