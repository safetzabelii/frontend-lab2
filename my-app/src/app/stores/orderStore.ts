import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { off } from "process";
import { Order } from "../models/Order/Order";

export default class OrderStore{
orderRegistry = new Map<string,Order>();
    selectedOrder:Order |undefined = undefined;
    editMode =false;
    loading = false;
    loadingInitial = false;
    createOrderForm = false;
    

    constructor(){
        makeAutoObservable(this)
    }
    
    get orderById(){
        return Array.from(this.orderRegistry.values()).sort((a, b)=> Number(a.orderid) - Number(b.orderid) );
    }
    
    get orders(){
        return Array.from(this.orderRegistry.values());
    }

    loadOrders = async () => {
        try{
            const orders = await agent.Orders.list();
            orders.forEach((order: Order)=>{
                this.setOrder(order);
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
    createOrder = async (order:Order)=>{
        this.loading=true;
        try{
            await agent.Orders.create(order);
            runInAction(()=>{
                this.orderRegistry.set(order.orderid!,order);
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
    updateOrder = async (order:Order)=>{
        this.loading= true;
        try{
            await agent.Orders.update(order);
            runInAction(()=>{
                this.orderRegistry.set(order.orderid!,order);
                this.selectedOrder=order;
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
    deleteOrder = async(id:string)=>{
        this.loading=true;
        try{
            await agent.Orders.delete(id);
            runInAction(()=>{
                this.orderRegistry.delete(id);
                this.loading=false;
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }
    loadOrder = async (id:string)=>{
        let order = this.getOrder(id);
        if(order){
            this.selectedOrder = order;
            return order;
        }
        else{
            this.loadingInitial=true;
            try{
                order = await  agent.Orders.details(id);
                this.setOrder(order!);
                runInAction(()=>{
                    this.selectedOrder=order;
                })
                this.setLoadingInitial(false);
                return order;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getOrder = (id:string)=>{
        return this.orderRegistry.get(id);
    }

    private setOrder = (order:Order)=>{
        this.orderRegistry.set(order.orderid!,order);
    }
}