export { type Menu };
import { type Restaurant } from './Restaurant';
interface Menu {
    id: string;
    name: string;
    description: string;
    image: string;
    restaurantId: number;
    restaurant: Restaurant;
  }