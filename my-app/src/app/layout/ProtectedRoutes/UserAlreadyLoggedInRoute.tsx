import { Outlet } from "react-router-dom";
import { useStore } from "../../stores/store";
import HomePage from "../Homepage";




const UserAlreadyLoggedInRoute = ()=>{

    const {userStore}=useStore();
    return (!userStore.isLoggedIn) ? <Outlet/>: <HomePage/>;
};

export default UserAlreadyLoggedInRoute;