import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Menu } from "../models/Menu/Menu";
import { MenuItem } from "../models/MenuItem/MenuItem";
import { Offer } from "../models/Offer/Offer";
import { Restaurant } from "../models/Menu/Restaurant";
import { Role } from "../models/Role/Role";
import { LogInResponseObject } from "../models/User/LogIn";
import { User } from "../models/User/User";
import { SignUp } from "../models/User/SignUp";
import { Order } from "../models/Order/Order";
import { OrderItem } from "../models/Order/OrderItem";
import { ForgotPassword } from "../models/User/Dto/ForgotPassword";
import { ChangePassword } from "../models/User/Dto/ChangePassword";
import { ForgotPasswordEmailDto } from "../models/User/Dto/ForgotPasswordEmailDto";
import { ForgotPasswordEmailResponseDto } from "../models/User/Dto/ForgotPasswordEmailResponseDto";
import { OfferDto } from "../models/Offer/OfferDto";
import { UserEditDto } from "../models/User/Dto/UserEditDto";
import { toast } from "react-toastify";
import { ServerError } from "../models/Error/ServerError";
import { Cart } from "../models/Cart/Cart";
import { CartForEditDto } from "../models/Cart/CartForEditDto";
import { PaymentProcess } from "../models/Stripe/PaymentProcess";



axios.defaults.baseURL = "http://localhost:7017/api";

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async (response) => {
  if(response.data.message !== null){
    toast.success(response.data.message);
  }
  return response;
},(error:AxiosError<ServerError>)=>{
const {data,status,config}= error.response! 
console.log(data);
switch(status){
  case 400:
    if(typeof data === 'object'){
      if(data.errors){
      toast.error(data.errors[0]);
      }
    }
    else{
      toast.error("Bad Request");
    }
      break;
      case 401:
        if(typeof data === 'object'){
          if(data.errors){
          toast.error(data.errors[0]);
          }
        }
        else{
          toast.error("Unauthorized");
        }
      break;
      case 404:
        if(typeof data === 'object'){
          if(data.errors){
          toast.error(data.errors[0]);
          }
        }
        else{
          toast.error("Not Found");
        }
      break;
      case 500:
        if(typeof data === 'object'){

          if(data.errors){
          toast.error(data.errors[0]);
          }
        }
        else{
          toast.error("Server Error");
        }
      break;
}
return Promise.reject(Error);
}
);
const request = {

    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {},config?:AxiosRequestConfig) =>axios.post<T>(url, body,config).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
  };

const Carts = {
  details: (id:string) => request.get<Cart>(`/Cart/GetCartByUserId/${id}`),
  addToCart: (cart: CartForEditDto) => axios.put<ServerError<Cart>>("/Cart/AddToCart",cart),
  updateCartState:(cart:CartForEditDto)=>axios.put<ServerError<Cart>>("/Cart/UpdateCartState",cart),
  getNumberOfItemsInCart: (id:string)=>request.get<ServerError<number>>(`/Cart/GetNumberOfItemsInCart/${id}`),
  calculateTotalForCheckout: (id:string)=>request.get<ServerError<number>>(`/Cart/CalculateCartTotalForCheckout/${id}`),
  processPayment:(paymentProcess:PaymentProcess)=>axios.post<ServerError<string>>("/Cart/ProcessPayment",paymentProcess),
  removeMenuItem: (cartId:number,menuItemId:number)=>axios.delete<void>('/Cart/RemoveMenuItemFromCart', {
    params: {
      cartId: cartId,
      menuItemId: menuItemId
    }
  }),
  removeOffer: (cartId:number,offerId:number) => axios.delete<void>('/Cart/RemoveOfferFromCart',{
    params:{
      cartId:cartId,
      offerId : offerId
    }
  })

}
const Menus = {
    list: () => request.get<Menu[]>("/Menu/GetAllMenus"),
    details: (id: string) => request.get<Menu>(`/Menu/GetMenu/${id}`),
    create: (menu: FormData) => axios.post<ServerError<Menu>>("/Menu/CreateMenu", menu),
    update: (menu: FormData) => axios.put<ServerError<Menu>>("/Menu/EditMenu", menu),
    delete: (id: string) => axios.delete<void>(`/Menu/DeleteMenu/${id}`),
    getMenusByRestaurantId:(restaurantId:string) =>request.get<Menu[]>(`/Menu/GetMenusByRestaurantId/${restaurantId}`),
  };

const MenuItems = {
    list: () => request.get<MenuItem[]>("/MenuItem/GetAllMenuItem"),
    details: (id: number) => request.get<MenuItem>(`/MenuItem/GetMenuItem/${id}`),
    create: (menuItem: FormData) => axios.post<ServerError<MenuItem>>("/MenuItem/CreateMenuItem", menuItem),
    update: (menuItem: FormData) => axios.put<ServerError<MenuItem>>(`/MenuItem/EditMenuItem`, menuItem),
    delete: (id: number) => axios.delete<void>(`/MenuItem/DeleteMenu/${id}`),
    getMenuItemsByMenuId: (menuId:string)=>request.get<MenuItem[]>(`/MenuItem/GetMenuItemsByMenuId/${menuId}`),
    };

const Offers = {
    list: () => request.get<OfferDto[]>("/Offer/GetAllOffers"),
    details: (id: string) => request.get<Offer>(`/Offer/GetOffer/${id}`),
    create: (offer: FormData) => axios.post<ServerError<Offer>>("/Offer/CreateOffer", offer),
    update: (offer: FormData) => axios.put<ServerError<Offer>>('/Offer/EditOffer', offer),
    delete: (id: string) => axios.delete<void>(`/Offer/DeleteOffer/${id}`),
    };
    
const Orders = {
      list: () => request.get<Order[]>("/Order"),
      details: (id: string) => request.get<Order>(`/Order/${id}`),
      create: (order: Order) => axios.post<void>("/Order", order),
      update: (order: Order) => axios.put<void>(`/Order/${order.orderid}`, order),
      delete: (id: string) => axios.delete<void>(`/Order/${id}`),
      };

const OrderItems = {
        list: () => request.get<OrderItem[]>("/OrderItem"),
        details: (id: string) => request.get<OrderItem>(`/OrderItem/${id}`),
        create: (orderitem: OrderItem) => axios.post<void>("/OrderItem", orderitem),
        update: (orderitem: OrderItem) => axios.put<void>(`/OrderItem/${orderitem.orderitemid}`, orderitem),
        delete: (id: string) => axios.delete<void>(`/OrderItem/${id}`),
        };     

const Restaurants = {
    list: () => request.get<Restaurant[]>("/Restaurant/GetAllRestaurant"),
    details: (id: string) => request.get<Restaurant>(`/Restaurant/GetRestaurant/${id}`),
    create: (restaurant: FormData) => axios.post<ServerError<Restaurant>>("/Restaurant/CreateRestaurant", restaurant),
    update: (restaurant: FormData) => axios.put<ServerError<Restaurant>>('/Restaurant/EditRestaurant', restaurant),
    delete: (id: string) => axios.delete<void>(`/Restaurant/DeleteRestaurant/${id}`),
    getRestaurantsForSelect: ()=>request.get<Restaurant[]>("/Restaurant/GetRestaurantsForSelect"),
    };
const Roles = {
    list: () => request.get<Role[]>("/Role/GetAllRoles"),
    details: (id: string) => request.get<Role>(`/Role/GetRole/${id}`),
    create: (role: Role) => axios.post<ServerError<Role>>("/Role/CreateRole", role),
    update: (role: Role) => axios.put<ServerError<string>>("/Role/EditRole", role),
    delete: (id: string) => axios.delete<ServerError<string>>(`/Role/DeleteRole/${id}`),
    };
    const Users = {
        list: () => request.get<User[]>("User/GetAllUsers"),
        details: (id: string) => request.get<User>(`User/GetUser/${id}`),
        create: (user: SignUp) => axios.post<ServerError<string>>("/User/SignUp", user),
        update: (user: UserEditDto) => axios.put<void>(`/User/EditUser/`, user),
        delete: (id: string) => axios.delete<void>(`/User/DeleteUser/${id}`),
        logIn: (user: LogInResponseObject) => request.post<LogInResponseObject>("/User/LogIn", user),
        forgotPassword: (user: ForgotPassword)=> request.put<ForgotPassword>("/User/ForgotPassword",user),
        verifyEmail: (token:string) => request.put<void>(`/User/VerifyEmail/${token}`,token),
        changePassword : (user: ChangePassword)=> request.put<void>("/User/ChangePassword",user),
        sendForgotPasswordEmail : (email: ForgotPasswordEmailDto) => request.post<ForgotPasswordEmailResponseDto>("/User/SendForgotPasswordEmail",email),
        getAllUsersForAdminDashboardDisplay: () => request.get<User[]>("/User/GetAllUsersForAdminDashboardDisplay"),
        getUserByIdForEdit: (id:string) => request.get<UserEditDto>(`/User/GetUserForEdit/${id}`),
        getCurrentUser:(token: string) => axios.post<ServerError<User>>(`/User/GetCurrentUser/${token}`),
    }
        
  const agent = {
    Menus,
    MenuItems,
    Offers,
    Restaurants,
    Roles,
    Users,
    Orders,
    OrderItems,
    Carts,

  };
  
  export default agent;

    


