import { createContext, useContext } from "react";
import userStore from "./userStore";
import CommonStore from "./commonStore";


interface Store{
    
    userStore:userStore;
    commonStore: CommonStore;

}

export const store:Store={
    
    userStore:new userStore(),
    commonStore : new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}