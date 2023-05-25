import { PaymentIntent } from "./PaymentIntent";
import { StripeCustomer } from "./StripeCustomer";

export interface PaymentProcess {
    userId: string;
    stripeCustomer: StripeCustomer;
    paymentIntent:PaymentIntent;
}