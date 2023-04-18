import { Outlet } from "react-router-dom";

import { useStore } from "../stores/store";
import LoginForm from "./LoginForm";




const LoggedInUserRoute = ()=>{

    const {userStore}=useStore();
    return userStore.isLoggedIn ? <Outlet/>: <LoginForm/>;
};

export default LoggedInUserRoute;