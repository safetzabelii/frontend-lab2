import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { off } from "process";
import { OrderItem } from "../models/Order/OrderItem";

export default class OrderItemStore{
orderItemRegistry = new Map<string,OrderItem>();
    selectedOrderItem:OrderItem |undefined = undefined;
    editMode =false;
    loading = false;
    loadingInitial = false;
    createOrderItemForm = false;
    

    constructor(){
        makeAutoObservable(this)
    }
    
    get orderItemById(){
        return Array.from(this.orderItemRegistry.values()).sort((a, b)=> Number(a.orderitemid) - Number(b.orderitemid) );
    }
    
    get orderItems(){
        return Array.from(this.orderItemRegistry.values());
    }

    loadOrderItems = async () => {
        try{
            const orderitems = await agent.OrderItems.list();
            orderitems.forEach((orderitem: OrderItem)=>{
                this.setOrderItem(orderitem);
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
    createOrderItem = async (orderitem:OrderItem)=>{
        this.loading=true;
        try{
            await agent.OrderItems.create(orderitem);
            runInAction(()=>{
                this.orderItemRegistry.set(orderitem.orderitemid!,orderitem);
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
    updateOrderItem = async (orderitem:OrderItem)=>{
        this.loading= true;
        try{
            await agent.OrderItems.update(orderitem);
            runInAction(()=>{
                this.orderItemRegistry.set(orderitem.orderitemid!,orderitem);
                this.selectedOrderItem=orderitem;
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
    deleteOrderItem = async(id:string)=>{
        this.loading=true;
        try{
            await agent.OrderItems.delete(id);
            runInAction(()=>{
                this.orderItemRegistry.delete(id);
                this.loading=false;
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }
    loadOrderItem = async (id:string)=>{
        let orderitem = this.getOrderItem(id);
        if(orderitem){
            this.selectedOrderItem = orderitem;
            return orderitem;
        }
        else{
            this.loadingInitial=true;
            try{
                orderitem = await  agent.OrderItems.details(id);
                this.setOrderItem(orderitem!);
                runInAction(()=>{
                    this.selectedOrderItem=orderitem;
                })
                this.setLoadingInitial(false);
                return orderitem;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getOrderItem = (id:string)=>{
        return this.orderItemRegistry.get(id);
    }

    private setOrderItem = (orderitem:OrderItem)=>{
        this.orderItemRegistry.set(orderitem.orderitemid!,orderitem);
    }
}