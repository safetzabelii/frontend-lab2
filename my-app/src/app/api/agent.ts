import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Menu } from "../models/Menu/Menu";
import { MenuItem } from "../models/Menu/MenuItem";
import { Offer } from "../models/Menu/Offer";
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
import { config } from "process";
import { ForgotPasswordEmailResponseDto } from "../models/User/Dto/ForgotPasswordEmailResponseDto";



axios.defaults.baseURL = "http://localhost:7017/api";

const responseBody = (response: AxiosResponse) => response.data;

const request = {

    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {},config?:AxiosRequestConfig) =>axios.post<T>(url, body,config).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
  };


const Menus = {
    list: () => request.get<Menu[]>("/Menu"),
    details: (id: string) => request.get<Menu>(`/Menu/${id}`),
    create: (menu: Menu) => axios.post<void>("/Menu", menu),
    update: (menu: Menu) => axios.put<void>(`/Menu/${menu.id}`, menu),
    delete: (id: string) => axios.delete<void>(`/Menu/${id}`),
  };

const MenuItems = {
    list: () => request.get<MenuItem[]>("/MenuItem/GetAllMenuItem"),
    details: (id: string) => request.get<MenuItem>(`/MenuItem/GetMenuItem/${id}`),
    create: (menuItem: MenuItem) => axios.post<void>("/MenuItem/CreateMenuItem", menuItem),
    update: (menuItem: MenuItem) => axios.put<void>(`/MenuItem/EditMenuItem`, menuItem),
    delete: (id: string) => axios.delete<void>(`/MenuItem/DeleteMenu/${id}`),
    };

const Offers = {
    list: () => request.get<Offer[]>("/Offer"),
    details: (id: string) => request.get<Offer>(`/Offer/${id}`),
    create: (offer: Offer) => axios.post<void>("/Offer", offer),
    update: (offer: Offer) => axios.put<void>(`/Offer/${offer.id}`, offer),
    delete: (id: string) => axios.delete<void>(`/Offer/${id}`),
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
    list: () => request.get<Restaurant[]>("/Restaurant"),
    details: (id: string) => request.get<Restaurant>(`/Restaurant/${id}`),
    create: (restaurant: Restaurant) => axios.post<void>("/Restaurant", restaurant),
    update: (restaurant: Restaurant) => axios.put<void>(`/Restaurant/${restaurant.id}`, restaurant),
    delete: (id: string) => axios.delete<void>(`/Restaurant/${id}`),
    };
const Roles = {
    list: () => request.get<Role[]>("/Role/GetAllRoles"),
    details: (id: string) => request.get<Role>(`/Role/GetRole/${id}`),
    create: (role: Role) => axios.post<void>("/Role/CreateRole", role),
    update: (role: Role) => axios.put<void>("/Role/EditRole", role),
    delete: (id: string) => axios.delete<void>(`/Role/DeleteRole/${id}`),
    };
    const Users = {
        list: () => request.get<User[]>("User/GetAllUsers"),
        details: (id: string) => request.get<User>(`User/GetUser/${id}`),
        create: (user: SignUp) => axios.post<void>("/User/SignUp", user),
        update: (user: User) => axios.put<void>(`/User/EditUser/`, user),
        delete: (id: string) => axios.delete<void>(`/User/DeleteUser/${id}`),
        logIn: (user: LogInResponseObject) => request.post<LogInResponseObject>("/User/LogIn", user),
        forgotPassword: (user: ForgotPassword)=> request.put<ForgotPassword>("/User/ForgotPassword",user),
        verifyEmail: (token:string) => request.put<void>(`/User/VerifyEmail/${token}`,token),
        changePassword : (user: ChangePassword)=> request.put<void>("/User/ChangePassword",user),
        sendForgotPasswordEmail : (email: ForgotPasswordEmailDto) => request.post<ForgotPasswordEmailResponseDto>("/User/SendForgotPasswordEmail",email),
    }
        
  const agent = {
    Menus,
    MenuItems,
    Offers,
    Restaurants,
    Roles,
    Users,
    Orders,
    OrderItems

  };
  
  export default agent;

    


