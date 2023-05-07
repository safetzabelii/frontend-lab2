import { Menu } from './Menu';
export interface OfferDto {
    id: string;
    name: string;
    description: string;
    image: string;
    discountPercent: number;
    startDate: Date;
    endDate: Date;
  }