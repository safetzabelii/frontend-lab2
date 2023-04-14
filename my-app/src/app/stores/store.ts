import { createContext, useContext } from "react";
import userStore from "./userStore";
import CommonStore from "./commonStore";
import roleStore from "./roleStore";


interface Store{
    
    userStore:userStore;
    commonStore: CommonStore;
    roleStore:roleStore;

}

export const store:Store={
    
    userStore:new userStore(),
    commonStore : new CommonStore(),
    roleStore: new roleStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}