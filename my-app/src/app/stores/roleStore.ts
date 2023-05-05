import {  makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import { Role } from "../models/Role/Role";



export default class roleStore{
    roleRegistry = new Map<string,Role>();
    selectedRole:Role |undefined = undefined;
    editMode =false;
    loading = false;
    loadingInitial = false;
    createLendaForm = false;
    

    constructor(){
        makeAutoObservable(this)
    }
    
    // get rolebyId(){
    //     return Array.from(this.roleRegistry.values()).sort((a, b)=> Number(a.id) - Number(b.id) );
    // }
    // get lastItem(){
    //     return this.rolebyId.at(-1);
    // }
    // get rolet(){
    //     return Array.from(this.roleRegistry.values());
    // }
   

    // loadRolet = async () => {
    //     try{
    //         const klasat = await agent.Klasat.list();
    //         klasat.forEach(klasa=>{
    //             this.setKlasa(klasa);
    //         })
    //         this.setLoadingInitial(false);
    //     }catch(error){
            
    //         this.setLoadingInitial(false);
           
            
    //         console.log(error);
            
    //     }
    // }

    setLoadingInitial = (state: boolean)=>{
        this.loadingInitial=state;
    }
    createRole = async (role:Role)=>{
        this.loading=true;
        try{
            await agent.Roles.create(role);
            runInAction(()=>{
                this.roleRegistry.set(role.id!,role);
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
    get RoleByName(){
        return Array.from(this.roleRegistry.values()).sort((a,b) =>{
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

    loadRolet = async () => {
        try{
            const roles = await agent.Roles.list();
            roles.forEach((role:Role)=>{
                this.setRole(role);
            })
            this.setLoadingInitial(false);
        }catch(error){
            
            this.setLoadingInitial(false);
           
            
            console.log(error);
            
        }
    }
    updateRole = async (role:Role)=>{
        this.loading= true;
        try{
            await agent.Roles.update(role);
            runInAction(()=>{
                this.roleRegistry.set(role.id!,role);
                this.selectedRole=role;
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
    deleteRole = async(id:string)=>{
        this.loading=true;
        try{
            await agent.Roles.delete(id);
            runInAction(()=>{
                this.roleRegistry.delete(id);
                this.loading=false;
            })

        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
            
        }
    }
    loadRole = async (id:string)=>{
        let role = this.getRole(id);
        if(role){
            this.selectedRole = role;
            return role;
        }
        else{
            this.loadingInitial=true;
            try{
                role = await  agent.Roles.details(id);
                if(role != null){
                this.setRole(role);
                runInAction(()=>{
                    this.selectedRole=role!;
                })
                this.setLoadingInitial(false);
                return role;
            }else{
                return console.log("No role was retrived");
            }
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    

    private getRole = (id:string)=>{
        return this.roleRegistry.get(id);
    }

   private setRole = (role:Role)=>{
        this.roleRegistry.set(role.id!,role);
     }
}