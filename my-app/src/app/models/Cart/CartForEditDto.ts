import { MenuItemForCartDto } from "../MenuItem/MenuItemForCartDto";
import { MenuItemForCartEditDto } from "../MenuItem/MenuItemForCartEditDto";
import { OfferForCartDto } from "../Offer/OfferForCartDto";
import { OfferForCartEditDto } from "../Offer/OfferForCartEditDto";

export interface CartForEditDto{
    id: string,
    userId: string,
    cartMenuItems: MenuItemForCartEditDto[];
    cartOffers: OfferForCartEditDto[];
}