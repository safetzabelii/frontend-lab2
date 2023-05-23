import { MenuItem } from "../MenuItem/MenuItem";

export interface OrderItem {
    orderitemid: string,
    menuitemid: string,
    quantity: number,
    menuitem: MenuItem
}