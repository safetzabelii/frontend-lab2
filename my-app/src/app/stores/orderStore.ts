import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { off } from "process";
import { Order } from "../models/Order/Order";
import { OrderForDisplayDto } from "../models/Order/OrderForDisplayDto";
import { useNavigate } from "react-router-dom";

export default class OrderStore{
orderRegistry = new Map<string,OrderForDisplayDto>();
    selectedOrder:OrderForDisplayDto |undefined = undefined;
    editMode =false;
    loading = false;
    loadingInitial = false;
    createOrderForm = false;
    

    constructor(){
        makeAutoObservable(this)
    }
    
    get orderById(){
        return Array.from(this.orderRegistry.values()).sort((a, b)=> Number(a.id) - Number(b.id) );
    }
    
    get orders(){
        return Array.from(this.orderRegistry.values());
    }

    loadOrders = async () => {
        try{
            const response = await agent.Orders.list();
            response.data.forEach((order: OrderForDisplayDto)=>{
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
    getActiveOrderForAgent = async (agentId: string) => {
        try {
          var response = await agent.Orders.getActiveOrderForAgent(agentId);
          if (response) {
            this.setOrder(response.data.data!);
            runInAction(() => {
              this.selectedOrder = response.data.data;
              if (this.selectedOrder === undefined) {
                window.location.href = '/dashboard/listOrders'; // Navigate to the desired URL
              }
            });
            this.setLoadingInitial(false);
            return response.data;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
          this.setLoadingInitial(false);
        }
      };
      
    loadOrder = async (id:string)=>{
        let order = this.getOrder(id);
        if(order){
            this.selectedOrder = order;
            return order;
        }
        else{
            this.loadingInitial=true;
            try{
                var response = await  agent.Orders.details(id);
                this.setOrder(response.data!);
                runInAction(()=>{
                    this.selectedOrder=response.data;
                })
                this.setLoadingInitial(false);
                return order;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    updateOrderStatus = async(orderId:string,orderStatus:number)=>{
        this.loading= true;
        try{
            var response = await agent.Orders.updateOrderStatus(orderId,orderStatus);
                runInAction(()=>{
                    this.orderRegistry.set(response.data.data?.id!,response.data.data!);
                    this.selectedOrder=response.data.data;
                    this.editMode=false;
                    this.loading=false;
                    
                })
           
        }catch(error){
            runInAction(()=>{
                this.loading=false;
            })
            
        }
    }
    acceptOrder = async(orderId:number,userId:string)=>{
        try{
            var response = await  agent.Orders.acceptOrder(orderId,userId);
            runInAction(()=>{
                agent.Orders.list();
            })
            this.setLoadingInitial(false);
            return response.data;
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    sendEmailForOrderStatusToCustomer = async (orderId:string,distance:number)=>{
        try{
            const result = await agent.Orders.sendEmailForOrderStatusToCustomer(orderId,distance);
            if(result.data != null){
                console.log(result.data);
            }
            
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }
    private getOrder = (id:string)=>{
        return this.orderRegistry.get(id);
    }

    private setOrder = (order:OrderForDisplayDto)=>{
        this.orderRegistry.set(order.id!,order);
    }

    loadTopSellers = async () => {
        try {
          const topSellers = await agent.Orders.getTopSellers();
          console.log(topSellers);
        } catch (error) {
          console.log(error);
        }
      }
}