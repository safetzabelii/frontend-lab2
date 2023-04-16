import { createContext, useContext } from "react";
import userStore from "./userStore";
import CommonStore from "./commonStore";

import MenuItemStore from "./menuItemStore";
import MenuStore from "./menuStore";
import RestaurantStore from "./restaurantStore";
import OfferStore from "./offerStore";
import roleStore from "./roleStore";



interface Store{
    
    userStore:userStore;
    commonStore: CommonStore;
    menuItemStore: MenuItemStore;
    menuStore: MenuStore;
    restaurantStore: RestaurantStore;
    offerStore: OfferStore;
    roleStore:roleStore;

}

export const store:Store={
    
    userStore:new userStore(),
    commonStore : new CommonStore(),
    menuItemStore : new MenuItemStore(),
    menuStore: new MenuStore(),
    restaurantStore: new RestaurantStore(),
    offerStore: new OfferStore(),
    roleStore: new roleStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}