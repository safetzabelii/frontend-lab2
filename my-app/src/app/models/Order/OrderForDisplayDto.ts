import { MenuItemForOrderDto } from "../MenuItem/MenuItemForOrderDto";
import { OrderForOrderDto } from "../Offer/OfferForOrderDto";


export interface OrderForDisplayDto {
    id: string,
    user: string,
    menuItems: MenuItemForOrderDto[],
    offers: OrderForOrderDto[],
    total: number,
    agent:string,
    deliveryAddress:string,
    orderStatus: number,
}