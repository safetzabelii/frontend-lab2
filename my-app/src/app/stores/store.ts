import { createContext, useContext } from "react";
import userStore from "./userStore";
import CommonStore from "./commonStore";
<<<<<<< HEAD
import MenuItemStore from "./menuItemStore";
import MenuStore from "./menuStore";
import RestaurantStore from "./restaurantStore";
import OfferStore from "./offerStore";
=======
import roleStore from "./roleStore";
>>>>>>> 86d199653732d991b836fea19f7c06a6158f47c4


interface Store{
    
    userStore:userStore;
    commonStore: CommonStore;
<<<<<<< HEAD
    menuItemStore: MenuItemStore;
    menuStore: MenuStore;
    restaurantStore: RestaurantStore;
    offerStore: OfferStore;
=======
    roleStore:roleStore;

>>>>>>> 86d199653732d991b836fea19f7c06a6158f47c4
}

export const store:Store={
    
    userStore:new userStore(),
    commonStore : new CommonStore(),
<<<<<<< HEAD
    menuItemStore : new MenuItemStore(),
    menuStore: new MenuStore(),
    restaurantStore: new RestaurantStore(),
    offerStore: new OfferStore()
=======
    roleStore: new roleStore()
>>>>>>> 86d199653732d991b836fea19f7c06a6158f47c4
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}