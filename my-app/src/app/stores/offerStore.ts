import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Offer } from "../models/Menu/Offer";
import { off } from "process";
import { OfferDto } from "../models/Menu/OfferDto";

export default class OfferStore{
offerRegistry = new Map<string,OfferDto>();
    selectedOffer:OfferDto |undefined = undefined;
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
            const offers = await agent.Offers.list();
            offers.forEach((offer: Offer)=>{
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
    createOffer = async (offer:OfferDto)=>{
        this.loading=true;
        try{
            await agent.Offers.create(offer);
            runInAction(()=>{
                this.offerRegistry.set(offer.id!,offer);
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
    updateOffer = async (offer:Offer)=>{
        this.loading= true;
        try{
            await agent.Offers.update(offer);
            runInAction(()=>{
                this.offerRegistry.set(offer.id!,offer);
                this.selectedOffer=offer;
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
                offer = await  agent.Offers.details(id);
                this.setOffer(offer!);
                runInAction(()=>{
                    this.selectedOffer=offer;
                })
                this.setLoadingInitial(false);
                return offer;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getOffer = (id:string)=>{
        return this.offerRegistry.get(id);
    }

    private setOffer = (offer:OfferDto)=>{
        this.offerRegistry.set(offer.id!,offer);
    }
}