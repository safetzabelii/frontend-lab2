export { type Menu };
import { type Restaurant } from './Restaurant';
interface Menu {
    id: number;
    name: string;
    description: string;
    image: string;
    restaurantId: number;
    restaurant: Restaurant;
  }