import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { MenuItem } from "../models/Menu/MenuItem";

export default class MenuItemStore {
    menuItemRegistry = new Map<string, MenuItem>();
    selectedMenuItem: MenuItem | undefined = undefined;
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
            const menuItems = await agent.MenuItems.list();
            menuItems.forEach((menuitem: MenuItem)=>{
                this.setMenuItem(menuitem);
            })
            this.setLoadingInitial(false);
        }catch(error){
            this.setLoadingInitial(false);
            console.log(error);
        }
    }

    createMenuItem = async(menuItem: MenuItem) => {
        this.loading = true;
        try{
            await agent.MenuItems.create(menuItem);
            runInAction(() =>{
                this.menuItemRegistry.set(menuItem.id!, menuItem);
                this.editMode=false;
                this.loading=false;
            })
        }catch(error){
            console.log(error);
            runInAction(() =>{
                this.loading = false;
            })
        }
    }

    deleteMenuItem = async(id: string) =>{
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

    loadMenuItem = async(id:string) => {
        let menuItem = this.getMenuItem(id);
        if(menuItem){
            this.selectedMenuItem = menuItem;
            return menuItem;
        }
        else{
            this.loadingInitial = true;
            try{
                menuItem = await agent.MenuItems.details(id);
                this.setMenuItem(menuItem!);
                runInAction(() => {
                    this.selectedMenuItem =menuItem;
                })
                this.setLoadingInitial(false);
                return menuItem;
            }   catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getMenuItem = (id: string) => {
        return this.menuItemRegistry.get(id);
    }

    private setMenuItem = (menuItem: MenuItem) =>{
        this.menuItemRegistry.set(menuItem.id!, menuItem);
    }


}