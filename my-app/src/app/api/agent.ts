import axios, { AxiosResponse } from "axios";
import { Menu } from "../models/Menu/Menu";
import { MenuItem } from "../models/Menu/MenuItem";
import { Offer } from "../models/Menu/Offer";
import { Restaurant } from "../models/Menu/Restaurant";
import { Role } from "../models/Role/Role";

import { LogInResponseObject } from "../models/User/LogIn";
import { User } from "../models/User/User";
import { SignUp } from "../models/User/SignUp";



axios.defaults.baseURL = "http://localhost:7017/api";

const responseBody = (response: AxiosResponse) => response.data;

const request = {

    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) =>axios.post<T>(url, body).then(responseBody),
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
    list: () => request.get<MenuItem[]>("/MenuItem/GetAllMenuItems"),
    details: (id: string) => request.get<MenuItem>(`/MenuItem/GetMenuItem${id}`),
    create: (menuItem: MenuItem) => axios.post<void>("/MenuItem/CreateMenuItem", menuItem),
    update: (menuItem: MenuItem) => axios.put<void>(`/MenuItem/EditMenuItem${menuItem.id}`, menuItem),
    delete: (id: string) => axios.delete<void>(`/MenuItem/DeleteMenu${id}`),
    };

const Offers = {
    list: () => request.get<Offer[]>("/Offer"),
    details: (id: string) => request.get<Offer>(`/Offer/${id}`),
    create: (offer: Offer) => axios.post<void>("/Offer", offer),
    update: (offer: Offer) => axios.put<void>(`/Offer/${offer.id}`, offer),
    delete: (id: string) => axios.delete<void>(`/Offer/${id}`),
    };

const Restaurants = {
    list: () => request.get<Restaurant[]>("/Restaurant"),
    details: (id: string) => request.get<Restaurant>(`/Restaurant/${id}`),
    create: (restaurant: Restaurant) => axios.post<void>("/Restaurant", restaurant),
    update: (restaurant: Restaurant) => axios.put<void>(`/Restaurant/${restaurant.id}`, restaurant),
    delete: (id: string) => axios.delete<void>(`/Restaurant/${id}`),
    };
const Roles = {
    list: () => request.get<Role[]>("/Role"),
    details: (id: string) => request.get<Role>(`/Role/${id}`),
    create: (role: Role) => axios.post<void>("/Role", role),
    update: (role: Role) => axios.put<void>(`/Role/${role.id}`, role),
    delete: (id: string) => axios.delete<void>(`/Role/${id}`),
    };
    const Users = {
        list: () => request.get<User[]>("User/GetAllUsers"),
        details: (id: string) => request.get<User>(`User/GetUser/${id}`),
        create: (user: SignUp) => axios.post<void>("/User/SignUp", user),
        update: (user: User) => axios.put<void>(`/User/EditUser/`, user),
        delete: (id: string) => axios.delete<void>(`/User/${id}`),
        logIn: (user: LogInResponseObject) => request.post<LogInResponseObject>("/User/LogIn", user)
    }





  const agent = {
    Menus,
    MenuItems,
    Offers,
    Restaurants,
    Roles,
    Users

  };
  
  export default agent;

    


