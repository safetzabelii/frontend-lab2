import { Menu } from './Menu';
export interface Offer {
    id: string;
    name: string;
    description: string;
    image?: string;
    imagePath?:string;
    restaurantId: number;
    discountPercent: number;
    price:number;
    startDate: Date|null;
    endDate: Date|null;
    restaurant: string;
  }