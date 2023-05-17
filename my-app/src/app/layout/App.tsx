
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import HomePage from './Homepage';
import AboutUs from './Aboutus';
import ContactUs from './Contactus';
import LoginForm from './LoginForm';

import Navbar from './navbar';

import LoggedInUserRoute from './ProtectedRoutes/LoggedInUserRoute';

import { store, useStore } from '../stores/store';
import MenuItem from '../../features/user/Menu/MenuItem/MenuItem';
import Restaurants from '../../features/user/Restaurant/Restaurants';
import UserAlreadyLoggedInRoute from './ProtectedRoutes/UserAlreadyLoggedInRoute';
import React, { useEffect, useState } from 'react';
import agent from '../api/agent';
// Admin
import ListRoles from '../../features/admin/role/listRoles';
import RoleCreateForm from '../../features/admin/role/roleCreateForm';
import RoleEditForm from '../../features/admin/role/roleEditForm';
import ModalContainer from './common/ModalContainer';
import AccountVerified from '../../features/user/User/accountVerified';
import SendEmailForgetPassword from '../../features/user/User/sendEmailForgetPassword';
import ForgotPassword from '../../features/user/User/forgotPassword';
import VerifyAccount from '../../features/user/User/verifyAccount';
import ChangePassword from '../../features/user/User/changePassword';
import AdminNavbar from '../../features/admin/features/adminNavbar';
import ListRestaurants from '../../features/admin/restaurants/listRestaurants';
import ListOffers from '../../features/admin/offers/listOffers';
import ListUsers from '../../features/admin/users/listUsers';
import UserDetails from '../../features/admin/users/userDetails';
import ListMenus from '../../features/admin/menu/listMenus';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RestaurantEditForm from '../../features/admin/restaurants/restaurantEditForm';
import MenuCreateForm from '../../features/admin/menu/menuCreateForm';
import ListMenuItems from '../../features/admin/menuItem/listMenuItems';
import MenuItemCreateForm from '../../features/admin/menuItem/menuItemCreateForm';
import MenuItemEditForm from '../../features/admin/menuItem/menuItemEditForm';
import OfferEditForm from '../../features/admin/offers/offerEditForm';
import OfferCreateForm from '../../features/admin/offers/offerCreateForm';

function App() {
  const verificationToken = store.commonStore.verificationToken;
  const {commonStore,userStore} = useStore();
  const cookies = commonStore.getCookies();
  const [loading, setLoading] = useState(true);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  let token = null;
  if (cookies) {
    token = cookies.token;  
  }
  useEffect(() => {
    const token = commonStore.getToken;
    
    if (token) {
      userStore.getCurrentUser(token)
        .then(() => {
          setLoading(false);
          setIsUserLoaded(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setIsUserLoaded(true);
        });
    } else {
      setLoading(false);
      setIsUserLoaded(true);
    }
  }, [commonStore, userStore]);
  
  useEffect(() => {
    if (isUserLoaded && userStore.user?.role === "Admin") {
      const allContents = document.getElementById('allContents') as HTMLDivElement;
      if (allContents) {
        allContents.className = "h-screen";
        allContents.style.display = 'flex';
        allContents.style.justifyContent = 'space-evenly';
      }
      
      const contentContainerWrapper = document.getElementById('contentContainerWrapper') as HTMLDivElement;
      if (contentContainerWrapper) {
        contentContainerWrapper.className = "flex-1";
      }
      
      const contentContainer = document.querySelector('.contentContainer') as HTMLDivElement;
      if (contentContainer) {
        contentContainer.style.display = 'flex';
        contentContainer.style.justifyContent = 'space-evenly';
      }
    }
  }, [isUserLoaded, userStore.user?.role]);
  return (
    <>
    {loading ? (
        <div>Loading...</div>
      ) : (
        <>
           <ToastContainer 
   position="top-right" 
   hideProgressBar
   autoClose={2000}
 
/>
   <BrowserRouter>
   <ModalContainer/>
    
    <div id="allContents">
    <Routes>
  <Route path={"/*"} element={<>
    {userStore.user?.role === "Admin" ? (
      <AdminNavbar />
    ) : (
        <Navbar />
    )}
        <div id="contentContainerWrapper">
<div className="contentContainer">
          <Routes>
            {/* Routes for all users */}
            <Route element={<UserAlreadyLoggedInRoute />}>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            {/* Routes common for all users */}
            <Route path="/" element={<HomePage />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/menu" element={<MenuItem />} />
            <Route path="/restaurants" element={<Restaurants />} />

            {/* Routes continued */}
            <Route path="/verifyaccount" element={<VerifyAccount />} />
            {verificationToken ? (
              <Route
                path={`/verifyAccount/${verificationToken}`}
                element={<AccountVerified verificationToken={verificationToken} />}
              />
            ) : null}
            <Route path="/sendEmail" element={<SendEmailForgetPassword />} />
            <Route path="/changepw" element={<ChangePassword />} />
            {token ? (
              <Route path={`/forgotPassword/${token}`} element={<ForgotPassword />} />
            ) : null}

            {/* Routes for authenticated users */}
            <Route element={<LoggedInUserRoute />}>
              <Route path="/dashboard/listRoles" element={<ListRoles />} />
              <Route path="/dashboard/roleCreateForm" element={<RoleCreateForm />} />
              <Route path="/dashboard/roleEditForm" element={<RoleEditForm />} />
              <Route path="/dashboard/listRestaurants" element={<ListRestaurants />} />
              <Route path="/dashboard/listOffers" element={<ListOffers />} />
              <Route path="/dashboard/userDetails/:id" element={<UserDetails />} />
              <Route path="/dashboard/listUsers" element={<ListUsers />} />
              <Route path="/dashboard/listMenus" element={<ListMenus />} />
              <Route path="/dashboard/restaurantEditForm" element={<RestaurantEditForm/>}/>
              <Route path="/dashboard/menuCreateForm" element={<MenuCreateForm/>}/>
              <Route path="/dashboard/menuItemCreateForm" element={<MenuItemCreateForm/>}/>
              <Route path="/dashboard/menuItemEditForm" element={<MenuItemEditForm/>}/>
              <Route path="/dashboard/listMenuItems" element={<ListMenuItems/>}/>
              <Route path="/dashboard/listOffers" element={<ListOffers/>}/>
              <Route path="/dashboard/offerCreateForm" element={<OfferCreateForm/>}/>
              <Route path="/dashboard/offerEditForm" element={<OfferEditForm/>}/>
              
            </Route>
          </Routes>
          </div>
      </div>
  </>} />
</Routes>
</div>
    </BrowserRouter>
    
        </>
      )}
  
    </>
    
  );
}
export default App;