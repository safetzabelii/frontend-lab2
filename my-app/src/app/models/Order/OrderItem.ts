import { MenuItem } from "../Menu/MenuItem";

export interface OrderItem {
    orderitemid: string,
    menuitemid: string,
    quantity: number,
    menuitem: MenuItem
}