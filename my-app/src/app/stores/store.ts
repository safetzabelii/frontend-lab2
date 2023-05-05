import { createContext, useContext } from "react";
import userStore from "./userStore";
import MenuItemStore from "./menuItemStore";
import MenuStore from "./menuStore";
import RestaurantStore from "./restaurantStore";
import OfferStore from "./offerStore";
import roleStore from "./roleStore";
import OrderStore from "./orderStore";
import OrderItemStore from "./orderItemStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";




interface Store{
    
    userStore:userStore;
    commonStore: CommonStore;
    menuItemStore: MenuItemStore;
    menuStore: MenuStore;
    restaurantStore: RestaurantStore;
    offerStore: OfferStore;
    roleStore:roleStore;
    orderStore: OrderStore;
    orderItemStore: OrderItemStore;
    modalStore: ModalStore;


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
    orderItemStore: new OrderItemStore(),
    modalStore: new ModalStore(),

}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}