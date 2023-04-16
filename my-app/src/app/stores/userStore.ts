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
        return !!this.user;
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
    // getUser = async () =>{
    //     try{
    //         const user = await agent.Account.current();
    //         runInAction(()=> this.user=user);
    //     }catch(error){
    //         console.log(error);
    //     }
    // }
    // registerStudentin = async (creds:StudentiFormValues)=>{
    //     try{
    //          await agent.Account.register(creds);
            
    //     }catch(error){
    //         throw error;
    //     }
    // }
    // registerProfesorin = async (creds:ProfesoriFormValues)=>{
    //     try{
    //          await agent.AccountProfesori.register(creds);
            
            
            
    //     }catch(error){
    //         throw error;
    //     }
    // }
}