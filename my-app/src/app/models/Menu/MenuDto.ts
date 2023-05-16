export interface MenuDto {
    id: string,
    name: string;
    description: string;
    restaurantId:string;
    image?: string;
    imagePath?:string;
    files?:string;
}