export {};
import { Menu } from './Menu';
interface Offer {
    id: number;
    name: string;
    description: string;
    image: string;
    menuId: number;
    discountPercent: number;
    startDate: Date;
    endDate: Date;
    menu: Menu;
  }