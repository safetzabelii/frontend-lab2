import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Menu } from "../models/Menu/Menu";
import { MenuDto } from "../models/Menu/MenuDto";
import { Cart } from "../models/Cart/Cart";
import { CartForEditDto } from "../models/Cart/CartForEditDto";
import { PaymentProcess } from "../models/Stripe/PaymentProcess";

export default class CartStore{
  
    cartReqistry = new Map<string,Cart>();
    selectedCart:Cart |undefined = undefined;
    createdCart:Cart|undefined = undefined;
    editMode =false;
    loading = false;
    loadingInitial = false;
    createMenuForm = false;
    numberOfItemInCart:number|undefined = undefined;
    cartTotal:number|null = null;

    constructor(){
        makeAutoObservable(this)
    }

    setLoadingInitial = (state: boolean)=>{
        this.loadingInitial=state;
    }
   

    selectCart = (cart: Cart) => {
        this.selectedCart = cart;
      };

   
      addToCart = async (cart:CartForEditDto)=>{
        this.loading= true;
        try{
            const response = await agent.Carts.addToCart(cart);
            runInAction(()=>{
                if(response.data.data != null){
                    this.createdCart = response.data.data as Cart;
                this.cartReqistry.set( this.createdCart.id!, this.createdCart);
                //this.createdCart= this.createdCart;
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
    updateCartState = async (cart:CartForEditDto)=>{
        this.loading= true;
        try{
            const response = await agent.Carts.updateCartState(cart);
            runInAction(()=>{
                if(response.data.data != null){
                    this.createdCart = response.data.data as Cart;
                this.cartReqistry.set( this.createdCart.id!, this.createdCart);
                //this.createdCart= this.createdCart;
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
    removeMenuItem = async(cartId:number,menuItemId:number)=>{
        this.loading=true;
        try{
            await agent.Carts.removeMenuItem(cartId,menuItemId);
            runInAction(()=>{
                this.loading=false;
            })

        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
            
        }
    }
    removeOffer = async(cartId:number,offerId:number)=>{
        this.loading=true;
        try{
            await agent.Carts.removeOffer(cartId,offerId);
            runInAction(()=>{
                this.loading=false;
            })

        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
            
        }
    }
    loadCart = async (id:string)=>{
            try{
                const result = await  agent.Carts.details(id);
                if(result.data != null){
                    this.setCart(result.data!);
                    runInAction(()=>{
                        this.selectedCart=result.data;
                    })
                }
                else{
                    return console.error("No cart was retrived");
                }
                this.setLoadingInitial(false);
                return result.data;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
    }
    getNumberOfItemsInCart = async (id:string)=>{
        try{
            const result = await  agent.Carts.getNumberOfItemsInCart(id);
            if(result.data != null){
                runInAction(()=>{
                    this.numberOfItemInCart=result.data;
                })
            }
            else{
                return console.error("test");
            }
            this.setLoadingInitial(false);
            return result.data;
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    processPayment = async (payment:PaymentProcess)=>{
        this.loading=true;
        try{
            const response = await agent.Carts.processPayment(payment);
            runInAction(()=>{
                if(response.data.data != null){
                    console.log(response.data.message);
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
    calculateCartTotalForCheckout = async (id:string)=>{
        try{
            const result = await  agent.Carts.calculateTotalForCheckout(id);
            if(result.data != null){
                runInAction(()=>{
                   this.cartTotal = result.data;
                })
            }
            else{
                return console.error("test");
            }
            this.setLoadingInitial(false);
            return result.data;
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    private getCart = (id:string)=>{
        return this.cartReqistry.get(id);
    }

    private setCart = (cart:Cart)=>{
        this.cartReqistry.set(cart.id!,cart);
    }
}