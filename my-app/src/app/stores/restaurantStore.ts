import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Restaurant } from "../models/Menu/Restaurant";
import { ReducerStateWithoutAction } from "react";

export default class RestaurantStore{
restaurantRegistry = new Map<string,Restaurant>();
    selectedRestaurant:Restaurant |undefined = undefined;
    createdRestaurant:Restaurant|undefined = undefined;
    editMode =false;
    loading = false;
    loadingInitial = false;
    createRestaurantForm = false;
    

    constructor(){
        makeAutoObservable(this)
    }

    get restaurantsByName() {
        return Array.from(this.restaurantRegistry.values()).sort((a, b) => a.name.localeCompare(b.name));
    }
    
    get restaurantById(){
        return Array.from(this.restaurantRegistry.values()).sort((a, b)=> Number(a.id) - Number(b.id) );
    }
    
    get getRestaurants(){
        return Array.from(this.restaurantRegistry.values());
    }

    loadRestaurants = async () => {
        this.setLoadingInitial(true);
        try{
            const result = await agent.Restaurants.list();
            result.data.forEach((restaurant: Restaurant)=>{
                this.setRestaurant(restaurant);
            })
            runInAction(() => {
                this.setLoadingInitial(false);
            });
        } catch(error){
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            });
        }
    }
    getRestaurantsForSelect = async()=>{
        this.setLoadingInitial(true);
        try{
            const result = await agent.Restaurants.getRestaurantsForSelect();
            result.data.forEach((restaurant: Restaurant)=>{
                this.setRestaurant(restaurant);
            })
            runInAction(() => {
                this.setLoadingInitial(false);
            });
        } catch(error){
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            });
        }
    }
    

    setLoadingInitial = (state: boolean)=>{
        this.loadingInitial=state;
    }
    createRestaurant = async (restaurant:FormData)=>{
        this.loading=true;
        try{
            const response = await agent.Restaurants.create(restaurant);

            runInAction(()=>{
                if(response.data.data != null){
                    this.createdRestaurant= response.data.data as Restaurant;
                this.restaurantRegistry.set(this.createdRestaurant.id!,this.createdRestaurant);
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
    updateRestaurant = async (restaurant:FormData)=>{
        this.loading= true;
        try{
            const response = await agent.Restaurants.update(restaurant);
            runInAction(()=>{
                if(response.data.data != null){
                    this.createdRestaurant= response.data.data as Restaurant;
                this.restaurantRegistry.set(this.createdRestaurant.id!,this.createdRestaurant);
                 }
                this.selectedRestaurant=this.createdRestaurant;
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
                var result = await  agent.Restaurants.details(id);
                if(result.data !=null){
                    this.setRestaurant(restaurant!);
                    runInAction(()=>{
                        this.selectedRestaurant=restaurant;
                    })
                    this.setLoadingInitial(false);
                    return result.data;;
                }
                else{
                    return console.log("No user was retrived");
                }
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
        console.log(this.restaurantRegistry);
    }
}