
import { type Restaurant } from './Restaurant';
export interface Menu {
    id: string;
    name: string;
    description: string;
    image?: string;
    imagePath?:string;
    restaurantId: string;
    restaurant?:string;
    files:string;
  }