import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Menu } from "../models/Menu/Menu";
import { MenuDto } from "../models/Menu/MenuDto";
import { Cart } from "../models/Cart/Cart";
import { CartForEditDto } from "../models/Cart/CartForEditDto";
import { PaymentProcess } from "../models/Stripe/PaymentProcess";
import { NotificationModel } from "../models/Notification/NotificationModel";

export default class NotificationStore{
  
    notificationReqistry = new Map<string,NotificationModel>();
    editMode =false;
    loading = false;
    editedNotification :NotificationModel|undefined = undefined;
    loadingInitial = false;
    createMenuForm = false;

    constructor(){
        makeAutoObservable(this)
    }

    setLoadingInitial = (state: boolean)=>{
        this.loadingInitial=state;
    }

    
    
    get notifications(){
        return Array.from(this.notificationReqistry.values());
    }

    get NotificationByName(){
        return Array.from(this.notificationReqistry.values()).sort((a,b) =>{
            let fa = a.title.toLowerCase(),
                fb = b.title.toLowerCase();

                if(fa<fb){
                    return -1;
                }
                if(fa>fb){
                    return 1;
                }
                return 0;
        });
    }

    loadNotifications = async (userId:string) => {
        try{
            const result = await agent.Notifications.list(userId);
            result.data.forEach((notification: NotificationModel)=>{
                this.setNotification(notification);
            })
            this.setLoadingInitial(false);
        }catch(error){
            
            this.setLoadingInitial(false);
           
            
            console.log(error);
            
        }
    }
    clearAllNotificationsForUser = async(userId:string)=>{
        try{
                await agent.Notifications.clearAllNotificationsForUser(userId);
            runInAction( ()=>{
               this.loadNotifications(userId);
            });
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }
    markNotificationAsRead = async(notificationId:string,userId:string)=>{
        try{
            await agent.Notifications.markNotificationAsRead(notificationId,userId);
        runInAction( ()=>{
             this.loadNotifications(userId);
        });
    }catch(error){
        console.log(error);
        runInAction(()=>{
            this.loading=false;
        })
    }
    }
    markAllNotificationsAsRead = async(userId:string)=>{
        try{
            await agent.Notifications.markAllNotificationsAsRead(userId);
        runInAction( ()=>{
             this.loadNotifications(userId);
        });
    }catch(error){
        console.log(error);
        runInAction(()=>{
            this.loading=false;
        })
    }
    }
    updateMenu = async (userId:string,notification:NotificationModel)=>{
        this.loading= true;
        try{
            const response = await agent.Notifications.update(userId,notification);
            runInAction(()=>{
                if(response.data.data != null){
                    this.editedNotification = response.data.data as NotificationModel;
                this.notificationReqistry.set( this.editedNotification.id!, this.editedNotification);
                }
                this.editMode=false;
                this.loading=false;
                
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
            
        }
    }
    
    private getNotification = (id:string)=>{
        return this.notificationReqistry.get(id);
    }

    private setNotification = (notification:NotificationModel)=>{
        this.notificationReqistry.set(notification.id!,notification);
    }
      
   
    
    
    
    
}