import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";

import { store } from "./store";
import { LogInResponseObject } from "../models/User/LogIn";

export default class UserStore {
    user: LogInResponseObject | null=null;
    

    constructor(){
        makeAutoObservable(this)
    }
    get isLoggedIn(){
        const token = window.localStorage.getItem('jwt');
        if(token){
            return true;
        }
        else{
            return false;
        }
    }
    login = async (creds: LogInResponseObject)=>{
        try{
            const user = await agent.Users.logIn(creds);
            const token = user.token;
            store.commonStore.setToken(token);
            runInAction(()=>{
            this.user = user;
            })
        }catch(error){
            throw error;
        }
    }
    logout = () =>{
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        
    }
}