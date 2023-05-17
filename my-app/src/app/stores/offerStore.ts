import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Offer } from "../models/Menu/Offer";
import { off } from "process";
import { OfferDto } from "../models/Menu/OfferDto";

export default class OfferStore{
offerRegistry = new Map<string,Offer>();
    selectedOffer:Offer |undefined = undefined;
    createdOffer:Offer|undefined = undefined;
    editMode =false;
    loading = false;
    loadingInitial = false;
    createOfferForm = false;
    

    constructor(){
        makeAutoObservable(this)
    }
    get offersByName() {
        return Array.from(this.offerRegistry.values()).sort((a, b) => a.name.localeCompare(b.name));
    }
    
    get offerById(){
        return Array.from(this.offerRegistry.values()).sort((a, b)=> Number(a.id) - Number(b.id) );
    }
    
    get offers(){
        return Array.from(this.offerRegistry.values());
    }

    loadOffers = async () => {
        try{
            const result = await agent.Offers.list();
            result.data.forEach((offer: Offer)=>{
                this.setOffer(offer);
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
    createOffer = async (offer:FormData)=>{
        this.loading=true;
        try{
            const response = await agent.Offers.create(offer);

            runInAction(()=>{
                if(response.data.data != null){
                    this.createdOffer = response.data.data as Offer;
                this.offerRegistry.set(this.createdOffer.id!,this.createdOffer);
                    
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
    updateOffer = async (offer:FormData)=>{
        this.loading= true;
        try{
            const response = await agent.Offers.update(offer);
            runInAction(()=>{
                if(response.data.data != null){
                    this.createdOffer = response.data.data as Offer;
                this.offerRegistry.set(this.createdOffer.id!,this.createdOffer);
                this.selectedOffer=this.createdOffer;
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
    deleteOffer = async(id:string)=>{
        this.loading=true;
        try{
            await agent.Offers.delete(id);
            runInAction(()=>{
                this.offerRegistry.delete(id);
                this.loading=false;
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }
    loadOffer = async (id:string)=>{
        let offer = this.getOffer(id);
        if(offer){
            this.selectedOffer = offer;
            return offer;
        }
        else{
            this.loadingInitial=true;
            try{
                const response = await  agent.Offers.details(id);
                console.log(response.data);
                if(response.data !=null){
                    this.setOffer(response.data!);
                    runInAction(()=>{
                        this.selectedOffer=response.data!;
                    })
                    this.setLoadingInitial(false);
                    return response.data;
                }
                else{
                    return console.log("No offer was retrived");
                }
                
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getOffer = (id:string)=>{
        return this.offerRegistry.get(id);
    }

    private setOffer = (offer:Offer)=>{
        this.offerRegistry.set(offer.id!,offer);
    }
}