import { User } from "../User/User";

export interface Order {
    orderid: string,
    userid: string,
    orderitem: number,
    total: number,
    user: User
}