import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";

import { store } from "./store";
import { LogInResponseObject } from "../models/User/LogIn";
import { SignUp } from "../models/User/SignUp";

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
    signup = async (creds: SignUp)=>{
        try{
            const user = await agent.Users.create(creds);
            if(user.data != null){
            store.commonStore.setVerificationToken(user.data);
            }
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }
    verifyAccount = async (token: string)=>{
        try{
            const result = await agent.Users.verifyEmail(token);
            if(result != null){
                console.log(result);
            }
            
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }
    logout = () =>{
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        
    }
}