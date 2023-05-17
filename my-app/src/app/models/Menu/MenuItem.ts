
import { Menu } from './Menu';
export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image?: string;
    menuId: string;
    menu?: string;
    imagePath?:string;
    files?:string;
  }