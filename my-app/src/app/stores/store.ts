import { createContext, useContext } from "react";
import userStore from "./userStore";
import CommonStore from "./commonStore";
<<<<<<< HEAD
=======

>>>>>>> 3af518b43dc1ab6efd474953c782a302578513ee
import MenuItemStore from "./menuItemStore";
import MenuStore from "./menuStore";
import RestaurantStore from "./restaurantStore";
import OfferStore from "./offerStore";
import roleStore from "./roleStore";
<<<<<<< HEAD
import OrderStore from "./orderStore";
import OrderItemStore from "./orderItemStore";
=======

>>>>>>> 3af518b43dc1ab6efd474953c782a302578513ee


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


}

export const store:Store={
    
    userStore:new userStore(),
    commonStore : new CommonStore(),
    menuItemStore : new MenuItemStore(),
    menuStore: new MenuStore(),
    restaurantStore: new RestaurantStore(),
    offerStore: new OfferStore(),
<<<<<<< HEAD
    roleStore: new roleStore(),
    orderStore: new OrderStore(),
    orderItemStore: new OrderItemStore()
=======
    roleStore: new roleStore()
>>>>>>> 3af518b43dc1ab6efd474953c782a302578513ee
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}