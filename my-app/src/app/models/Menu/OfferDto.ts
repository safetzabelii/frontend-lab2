import { Menu } from './Menu';
export interface OfferDto {
    id: number;
    name: string;
    description: string;
    image?: string;
    imagePath?:string;
    discountPercent: number;
    startDate: Date|null;
    endDate: Date|null;
    price?:number;
    restaurantId:string;
    restaurant?:string;
    files?:string;
  }