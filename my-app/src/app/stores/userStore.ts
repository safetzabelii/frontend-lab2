import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";
import { LogInResponseObject } from "../models/User/LogIn";
import { SignUp } from "../models/User/SignUp";
import { ForgotPassword } from "../models/User/Dto/ForgotPassword";
import { ForgotPasswordEmailDto } from "../models/User/Dto/ForgotPasswordEmailDto";
import { User } from "../models/User/User";
import { UserForAdminDashboardDto } from "../models/User/Dto/UserForAdminDashboardDto";
import { UserEditDto } from "../models/User/Dto/UserEditDto";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { ServerError } from "../models/Error/ServerError";
import { NavigateFunction, useNavigate } from "react-router-dom";



export default class UserStore {
    user: LogInResponseObject | null=null;
    userRegistry = new Map<string,User>();
    selectedUser:User |undefined = undefined;
    userForEdit: UserEditDto | undefined = undefined;
    editMode =false;
    loading = false;
    loadingInitial = false;
    



    constructor()
    {
        makeAutoObservable(this)  
    }
    
    get UserByName(){
        return Array.from(this.userRegistry.values()).sort((a,b) =>{
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();
                

                if(fa<fb){
                    return -1;
                }
                if(fa>fb){
                    return 1;
                }
                return 0;
        });
    }
    setLoadingInitial = (state: boolean)=>{
        this.loadingInitial=state;
    }
    get isLoggedIn(){
        const token = window.localStorage.getItem('jwt');
        return !!token;
    }
    loadUsers = async () => {
        try{
            const response = await agent.Users.list();
            response.data.forEach((user:User)=>{
                this.setUser(user);
            })
            this.setLoadingInitial(false);
        }catch(error){
            
            this.setLoadingInitial(false);
           
            
            console.log(error);
            
        }
    }
    updateUser = async (user:UserEditDto)=>{
        this.loading= true;
        try{
            var result = await agent.Users.update(user);
            runInAction(()=>{
                this.editMode=false;
                this.loading=false;
                
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
            
        }
    }
    deleteUser = async(id:string)=>{
        this.loading=true;
        try{
            var result = await agent.Users.delete(id);
            runInAction(()=>{
                this.userRegistry.delete(id);
                this.loading=false;
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
            
        }
    }
    loadUser = async (id:string)=>{
        let user = this.getUser(id);
        if(user){
            this.selectedUser = user;
            
            return user;
        }
        else{
            this.loadingInitial=true;
            try{
                var result = await  agent.Users.details(id);
                if(result.data != null){
                this.setUser(result.data);
                runInAction(()=>{
                    this.selectedUser=result.data!;
                })
                this.setLoadingInitial(false);
                return result.data;
            }else{
                return console.log("No user was retrived");
            }
            }catch(error:AxiosError<ServerError>|any){
                this.setLoadingInitial(false);
            }
        }
    }
    loadUserForEdit = async (id:string)=>{
            try{
                var result = await  agent.Users.getUserByIdForEdit(id);
                if(result.data != null){
                runInAction(()=>{
                    this.userForEdit=result.data!;
                })
                this.setLoadingInitial(false);
                return result.data;
            }else{
                return console.log("No user was retrived");
            }
            }catch(error:AxiosError<ServerError>|any){
                this.setLoadingInitial(false);
            }
        
    }
    private getUser = (id:string)=>{
        return this.userRegistry.get(id);
    }

   private setUser = (user:User)=>{
        this.userRegistry.set(user.id!,user);
 }



    login = async (creds: LogInResponseObject)=>{
        try{
            const result = await agent.Users.logIn(creds);
            const token = result.data.token;
            store.commonStore.setToken(token);
            runInAction(()=>{
            this.user = result.data;
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
            store.commonStore.setVerificationToken(null);
            window.localStorage.removeItem('vft');
            if(result.data != null){
                console.log(result.data);
            }
            
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }
    sendForgotPasswordEmail = async (email: ForgotPasswordEmailDto)=>{
        try{
            const result = await agent.Users.sendForgotPasswordEmail(email);
            if(result.data !=null){
                store.commonStore.setCookies(result.data.userId,result.data.encryptedToken,result.data.key,result.data.iv);
        }
        else{
            console.log("The email was not sent");
        }

        }catch(error){
            console.log(error);
            throw error;
        }
    }
    
    
      
    changeForgotenPassword = async (forgotPassword: ForgotPassword)=>{
        try{
            const result = await agent.Users.forgotPassword(forgotPassword);
            store.commonStore.setChangePasswordToken(null);
            window.localStorage.removeItem('userId');
            store.commonStore.setUserId(null);
            window.localStorage.removeItem('cpt');
            return result.data;
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
    getAllUsersForAdminDashboardDisplay= async ()=>{
        try{
            const response = await agent.Users.getAllUsersForAdminDashboardDisplay();
            response.data.forEach((user:UserForAdminDashboardDto)=>{
                this.setUser(user);
            })
            this.setLoadingInitial(false);
        }catch(error){
            
            this.setLoadingInitial(false);
           
            
            console.log(error);
            
        }
    }
}