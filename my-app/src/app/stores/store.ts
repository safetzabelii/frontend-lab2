import { createContext, useContext } from "react";
import userStore from "./userStore";
import MenuItemStore from "./menuItemStore";
import MenuStore from "./menuStore";
import RestaurantStore from "./restaurantStore";
import OfferStore from "./offerStore";
import roleStore from "./roleStore";
import OrderStore from "./orderStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import { NavigateFunction } from "react-router-dom";
import CartStore from "./cartStore";
import NotificationStore from "./notificationStore";




interface Store{
    
    userStore:userStore;
    commonStore: CommonStore;
    menuItemStore: MenuItemStore;
    menuStore: MenuStore;
    restaurantStore: RestaurantStore;
    offerStore: OfferStore;
    roleStore:roleStore;
    orderStore: OrderStore;
    modalStore: ModalStore;
    cartStore: CartStore;
    notificationStore:NotificationStore;

}

export const store:Store={
    
    userStore:new userStore(),
    commonStore : new CommonStore(),
    menuItemStore : new MenuItemStore(),
    menuStore: new MenuStore(),
    restaurantStore: new RestaurantStore(),
    offerStore: new OfferStore(),
    roleStore: new roleStore(),
    orderStore: new OrderStore(),
    modalStore: new ModalStore(),
    cartStore: new CartStore(),
    notificationStore:new NotificationStore(),
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}