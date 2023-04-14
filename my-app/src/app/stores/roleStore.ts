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
//     updateKlasa = async (klasa:Klasa)=>{
//         this.loading= true;
//         try{
//             await agent.Klasat.update(klasa);
//             runInAction(()=>{
//                 this.klasaRegistry.set(klasa.id!,klasa);
//                 this.selectedKlasa=klasa;
//                 this.editMode=false;
//                 this.loading=false;
                
//             })
//         }catch(error){
//             console.log(error);
//             runInAction(()=>{
//                 this.loading=false;
//             })
            
//         }
//     }
//     deleteKlasa = async(id:string)=>{
//         this.loading=true;
//         try{
//             await agent.Klasat.delete(id);
//             runInAction(()=>{
//                 this.klasaRegistry.delete(id);
//                 this.loading=false;
//             })

//         }catch(error){
//             console.log(error);
//             runInAction(()=>{
//                 this.loading=false;
//             })
            
//         }
//     }
//     loadKlasa = async (id:string)=>{
//         let klasa = this.getKlasa(id);
//         if(klasa){
//             this.selectedKlasa = klasa;
//             return klasa;
//         }
//         else{
//             this.loadingInitial=true;
//             try{
//                 klasa = await  agent.Klasat.details(id);
//                 this.setKlasa(klasa);
//                 runInAction(()=>{
//                     this.selectedKlasa=klasa;
//                 })
//                 this.setLoadingInitial(false);
//                 return klasa;
//             }catch(error){
//                 console.log(error);
//                 this.setLoadingInitial(false);
//             }
//         }
//     }
    

//     private getKlasa = (id:string)=>{
//         return this.klasaRegistry.get(id);
//     }

//     private setKlasa = (klasa:Klasa)=>{
//         this.klasaRegistry.set(klasa.id!,klasa);
//     }
}