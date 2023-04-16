import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Restaurant } from "../models/Menu/Restaurant";

export default class RestaurantStore{
restaurantRegistry = new Map<string,Restaurant>();
    selectedRestaurant:Restaurant |undefined = undefined;
    editMode =false;
    loading = false;
    loadingInitial = false;
    createRestaurantForm = false;
    

    constructor(){
        makeAutoObservable(this)
    }
    
    get restaurantById(){
        return Array.from(this.restaurantRegistry.values()).sort((a, b)=> Number(a.id) - Number(b.id) );
    }
    
    get restaurants(){
        return Array.from(this.restaurantRegistry.values());
    }

    loadRestaurants = async () => {
        try{
            const restaurants = await agent.Restaurants.list();
            restaurants.forEach((restaurant: Restaurant)=>{
                this.setRestaurant(restaurant);
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
    createRestaurant = async (restaurant:Restaurant)=>{
        this.loading=true;
        try{
            await agent.Restaurants.create(restaurant);
            runInAction(()=>{
                this.restaurantRegistry.set(restaurant.id!,restaurant);
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
    updateRestaurant = async (restaurant:Restaurant)=>{
        this.loading= true;
        try{
            await agent.Restaurants.update(restaurant);
            runInAction(()=>{
                this.restaurantRegistry.set(restaurant.id!,restaurant);
                this.selectedRestaurant=restaurant;
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
    deleteRestaurant = async(id:string)=>{
        this.loading=true;
        try{
            await agent.Restaurants.delete(id);
            runInAction(()=>{
                this.restaurantRegistry.delete(id);
                this.loading=false;
            })

        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
            
        }
    }
    loadRestaurant = async (id:string)=>{
        let restaurant = this.getRestaurant(id);
        if(restaurant){
            this.selectedRestaurant = restaurant;
            return restaurant;
        }
        else{
            this.loadingInitial=true;
            try{
                restaurant = await  agent.Restaurants.details(id);
                this.setRestaurant(restaurant!);
                runInAction(()=>{
                    this.selectedRestaurant=restaurant;
                })
                this.setLoadingInitial(false);
                return restaurant;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getRestaurant = (id:string)=>{
        return this.restaurantRegistry.get(id);
    }

    private setRestaurant = (restaurant:Restaurant)=>{
        this.restaurantRegistry.set(restaurant.id!,restaurant);
    }
}