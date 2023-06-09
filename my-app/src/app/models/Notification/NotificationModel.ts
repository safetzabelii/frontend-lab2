import { UserForNotificationDto } from "./UserForNotificationDto";

export interface NotificationModel{
    id:string;
    title:string;
    message:string;
    created:string;
    link:string;
    userId:string;
    isRead:boolean;
}