
import { Menu } from './Menu';
export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    menuId: number;
    menu: Menu;
  }