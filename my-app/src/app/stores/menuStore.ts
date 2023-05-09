import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Menu } from "../models/Menu/Menu";

export default class MenuStore{
  static isMenuOpen: JSX.Element;
  static selectedMenu(arg0: string): void {
    throw new Error("Method not implemented.");
  }
menuRegistry = new Map<string,Menu>();
    selectedMenu:Menu |undefined = undefined;
    editMode =false;
    loading = false;
    loadingInitial = false;
    createMenuForm = false;
    

    constructor(){
        makeAutoObservable(this)
    }
    
    get menuById(){
        return Array.from(this.menuRegistry.values()).sort((a, b)=> Number(a.id) - Number(b.id) );
    }
    
    get menus(){
        return Array.from(this.menuRegistry.values());
    }

    get MenuByName(){
        return Array.from(this.menuRegistry.values()).sort((a,b) =>{
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

    loadMenus = async () => {
        try{
            const menus = await agent.Menus.list();
            menus.forEach((menu: Menu)=>{
                this.setMenu(menu);
            })
            this.setLoadingInitial(false);
        }catch(error){
            
            this.setLoadingInitial(false);
           
            
            console.log(error);
            
        }
    }

    setLoadingInitial = (state: boolean)=>{
        this.loadingInitial=state;
    }
    createMenu = async (menu:Menu)=>{
        this.loading=true;
        try{
            await agent.Menus.create(menu);
            runInAction(()=>{
                this.menuRegistry.set(menu.id!,menu);
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

    selectMenu = (menu: Menu) => {
        this.selectedMenu = menu;
      };

    updateMenu = async (menu:Menu)=>{
        this.loading= true;
        try{
            await agent.Menus.update(menu);
            runInAction(()=>{
                this.menuRegistry.set(menu.id!,menu);
                this.selectedMenu=menu;
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
    deleteMenu = async(id:string)=>{
        this.loading=true;
        try{
            await agent.Menus.delete(id);
            runInAction(()=>{
                this.menuRegistry.delete(id);
                this.loading=false;
            })

        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
            
        }
    }
    loadMenu = async (id:string)=>{
        let menu = this.getMenu(id);
        if(menu){
            this.selectedMenu = menu;
            return menu;
        }
        else{
            this.loadingInitial=true;
            try{
                menu = await  agent.Menus.details(id);
                this.setMenu(menu!);
                runInAction(()=>{
                    this.selectedMenu=menu;
                })
                this.setLoadingInitial(false);
                return menu;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getMenu = (id:string)=>{
        return this.menuRegistry.get(id);
    }

    private setMenu = (menu:Menu)=>{
        this.menuRegistry.set(menu.id!,menu);
    }
}