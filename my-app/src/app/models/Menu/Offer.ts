import { Menu } from './Menu';
export interface Offer {
    id: string;
    name: string;
    description: string;
    image: string;
    menuId: number;
    discountPercent: number;
    startDate: Date;
    endDate: Date;
    menu: Menu;
  }