import { MenuItemForCartDto } from "../MenuItem/MenuItemForCartDto";
import { OfferForCartDto } from "../Offer/OfferForCartDto";

export interface Cart{
    id: string,
    userId: string,
    menuItems: MenuItemForCartDto[];
    offers: OfferForCartDto[];
}