import './App.css';
import {  Route, Routes, BrowserRouter } from 'react-router-dom';
import Signup from './Signup';
import HomePage from './Homepage';
import AboutUs from './Aboutus';
import ContactUs from './Contactus';
import LoginForm from './LoginForm';
import { css } from '@emotion/react';
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
import AdminNavbar from '../../features/admin/dashboard/adminNavbar';
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
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { CircleLoader } from 'react-spinners';
import AdminDashboard from '../../features/admin/dashboard/adminDashboard';
import CartDetails from '../../features/user/Cart/cartDetails';
import Orders from '../../features/user/Orders/Orders';
import Slider from './Slider';


function App() {
  const verificationToken = store.commonStore.verificationToken;
  const { commonStore, userStore } = useStore();
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
      userStore
        .getCurrentUser(token)
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
    if (isUserLoaded && userStore.user?.role === 'Admin') {
      const allContents = document.getElementById('allContents') as HTMLDivElement;
      if (allContents) {
        allContents.className = 'h-screen';
        allContents.style.display = 'flex';
        allContents.style.justifyContent = 'space-evenly';
      }

      const contentContainerWrapper = document.getElementById('contentContainerWrapper') as HTMLDivElement;
      if (contentContainerWrapper) {
        contentContainerWrapper.className = 'flex-1';
      }

      const contentContainer = document.querySelector('.contentContainer') as HTMLDivElement;
      if (contentContainer) {
        contentContainer.style.display = 'flex';
        contentContainer.style.justifyContent = 'space-evenly';
      }
    }
  }, [isUserLoaded, userStore.user?.role]);

  const override = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`

  return (
    <>
    {/* <div className='App flex'> */}
      {loading ? (
     <div className="fixed inset-0 flex items-center justify-center bg-green-900 bg-opacity-50 z-50">
     <div className="loading-spinner">
       <CircleLoader color="#ffffff" size={30} loading={true} />
     </div>
   </div>
      ) : (
        <>
       
          <ToastContainer position="top-right" hideProgressBar autoClose={2000} />

          <BrowserRouter>
          <PerfectScrollbar>
            <div className='scroll-container'>
            <ModalContainer />

            <div id="allContents">
        <Routes>
          <Route path={'/*'} element={<>
            {/* Render the appropriate navbar based on the user role */}
            {userStore.user?.role === 'Admin' ? <AdminNavbar /> : <Navbar />}
            <div id="contentContainerWrapper">
              <div className="contentContainer">
                      <Routes>
                      <Route path="/homepage" element={<HomePage />} />
                        {/* Routes for all users */}
                        <Route element={<UserAlreadyLoggedInRoute />}>
                          <Route path="/login" element={<LoginForm />} />
                          <Route path="/signup" element={<Signup />} />
                        </Route>

                        {/* Routes common for all users */}
                        
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route path="/contactus" element={<ContactUs />} />
                        <Route path="/menu" element={<MenuItem />} />
                        <Route path="/restaurants" element={<Restaurants />} />
                        <Route path="/cartDetails/:id" element={<CartDetails/>}/>
                        <Route path="/orders" element={<Orders/>} />
                        <Route path="/slider" element={<Slider/>}/>

                        {/* Routes continued */}
                        <Route path="/verifyaccount" element={<VerifyAccount />} />


                        {verificationToken ? (
                          <Route
                            path={`/verifyAccount/${verificationToken}`}
                            element={<AccountVerified verificationToken={verificationToken} />}
                          />
                        ) :null}
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
                          <Route path="/dashboard/restaurantEditForm" element={<RestaurantEditForm />} />
                          <Route path="/dashboard/menuCreateForm" element={<MenuCreateForm />} />
                          <Route path="/dashboard/menuItemCreateForm" element={<MenuItemCreateForm />} />
                          <Route path="/dashboard/menuItemEditForm" element={<MenuItemEditForm />} />
                          <Route path="/dashboard/listMenuItems" element={<ListMenuItems />} />
                          <Route path="/dashboard/listOffers" element={<ListOffers />} />
                          <Route path="/dashboard/offerCreateForm" element={<OfferCreateForm />} />
                          <Route path="/dashboard/offerEditForm" element={<OfferEditForm />} />
                          <Route path="/dashboard" element={<AdminDashboard />} />
                        </Route>
                      </Routes>
                    </div>
                  </div>
                </>} />
              </Routes>
            </div>
            </div>
            </PerfectScrollbar>
          </BrowserRouter>
          
        </>

      )}
      {/* </div> */}
    </>
    
    
  );
  
}

export default App;
