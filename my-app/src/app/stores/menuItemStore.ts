import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { MenuItem } from "../models/Menu/MenuItem";

export default class MenuItemStore {
    menuItemRegistry = new Map<number, MenuItem>();
    selectedMenuItem: MenuItem | undefined = undefined;
    createdMenuItem:MenuItem|undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    createMenuItemForm = false;

    constructor() {
        makeAutoObservable(this);
    }

    get getMenuItems() {
        return Array.from(this.menuItemRegistry.values());
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadMenuItems = async () => {
        try{
            const result = await agent.MenuItems.list();
            result.data.forEach((menuitem: MenuItem)=>{
                this.setMenuItem(menuitem);
            })
            this.setLoadingInitial(false);
        }catch(error){
            this.setLoadingInitial(false);
            console.log(error);
        }
    }
    getMenuItemsByMenuId = async (id:string) => {
        try{
            this.menuItemRegistry.clear();
            const result = await agent.MenuItems.getMenuItemsByMenuId(id);
            result.data.forEach((menuitem: MenuItem)=>{
                this.setMenuItem(menuitem);
            })
            this.setLoadingInitial(false);
        }catch(error){
            this.setLoadingInitial(false);
            console.log(error);
        }
    }
    createMenuItem = async (menuItem:FormData)=>{
        this.loading=true;
        try{
            const response = await agent.MenuItems.create(menuItem);
            runInAction(()=>{
                if(response.data.data != null){
                    this.createdMenuItem = response.data.data as MenuItem;
                    this.menuItemRegistry.set(this.createdMenuItem.id!,this.createdMenuItem);
                }
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

    deleteMenuItem = async(id: number) =>{
        this.loading = true;
        try{
            await agent.MenuItems.delete(id);
            runInAction(() => {
                this.menuItemRegistry.delete(id);
                this.loading=false;
            })
        }catch(error){
            console.log(error);
            runInAction(() =>{
                this.loading = false;
            })
        }
    }
    updateMenuItem = async (menuItem:FormData)=>{
        this.loading= true;
        try{
            var response = await agent.MenuItems.update(menuItem);
            runInAction(()=>{
                if(response.data.data != null){
                    this.createdMenuItem = response.data.data as MenuItem;
                this.menuItemRegistry.set( this.createdMenuItem.id!, this.createdMenuItem);
                this.selectedMenuItem= this.createdMenuItem;
                }
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

    loadMenuItem = async(id:number) => {
        let menuItem = this.getMenuItem(id);
        if(menuItem){
            this.selectedMenuItem = menuItem;
            return menuItem;
        }
        else{
            this.loadingInitial = true;
            try{
                const result = await agent.MenuItems.details(id);
                if(result.data != null){
                this.setMenuItem(menuItem!);
                runInAction(() => {
                    this.selectedMenuItem =menuItem;
                })
            }else{
                return console.log("No menu item was retrived");
            }
                this.setLoadingInitial(false);
                return result.data;
            }   catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getMenuItem = (id: number) => {
        return this.menuItemRegistry.get(id);
    }

    private setMenuItem = (menuItem: MenuItem) =>{
        this.menuItemRegistry.set(menuItem.id!, menuItem);
    }


}