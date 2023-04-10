export {};
import { Menu } from './Menu';
interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    menuId: number;
    menu: Menu;
  }