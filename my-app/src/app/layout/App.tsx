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
import Wrapper from '../../features/user/Cart/checkoutPage';
import ListOrders from '../../features/admin/order/listOrders';
import MenageOrder from '../../features/admin/order/menageOrder';
import TrackOrder from '../../features/admin/order/trackOrder';
import { observer } from 'mobx-react';
import SignalRService from '../SignalR/SignalRService';
import NotificationCenter from '../../features/admin/assets/NotificationCenter';
import ListParents from '../../features/admin/parents/listParents';
import ListChildren from '../../features/admin/children/listChildren';
import ListContracts from '../../features/admin/contracts/listContracts';
import ListEmployees from '../../features/admin/employees/listEmployees';




export default observer(function App() {
  const verificationToken = store.commonStore.verificationToken;
  const { commonStore, userStore,cartStore,notificationStore } = useStore();
  const {getCurrentUser} = userStore;
  const{getNumberOfItemsInCart} = cartStore;
  const {loadNotifications}= notificationStore;
  const cookies = commonStore.getCookies();
  const [loading, setLoading] = useState(false);
  const signalRService = new SignalRService();

  let token = "";
  if (cookies) {
    token = cookies.token;
  }
  const fetchUserAndCart = async () => {
    try {
      setLoading(true);
      const token = commonStore.getToken;

      if (token) {
        await getCurrentUser(token);
      }
      await getNumberOfItemsInCart(userStore.user?.id!);
      await loadNotifications(userStore.user?.id!);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    
     fetchUserAndCart();
      
      signalRService.startConnection();
    
      // Register event handler for notifications
        signalRService.listenForNotifications(() => {
          loadNotifications(userStore.user?.id!);
      });
      // Log connection status
      console.log("SignalR connection started");
    
      return () => {
        signalRService.stopConnection();
      };
  },[]);

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
       
          <ToastContainer position="bottom-right" hideProgressBar autoClose={2000} />

          <BrowserRouter>
          <PerfectScrollbar>
            <div className='scroll-container'>
            <ModalContainer />

            {userStore.user?.role === 'Admin' || userStore.user?.role === 'Agent' ? (
                <div id="allContents" className="h-screen flex">
                  <AdminNavbar />
                  <div id="contentContainerWrapper" className="flex-1 content-margin-left" style={{marginLeft: "20px", marginRight: "20px"}}
>
                    <div className="contentContainer">
                      <Routes>
                      <Route path="/" element={<HomePage />} />
                        {/* Routes for all users */}
                        <Route element={<UserAlreadyLoggedInRoute />}>
                          <Route path="/login" element={<LoginForm />} />
                          <Route path="/signup" element={<Signup />} />
                        </Route>

                        {/* Routes common for all users */}
                       
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route path="/contactus" element={<ContactUs />} />
                        <Route element={<LoggedInUserRoute />}>
                        <Route path="/menu" element={<MenuItem />} />
                        <Route path="/restaurants" element={<Restaurants />} />
                        <Route path="/cartDetails/:id" element={<CartDetails/>}/>
                        <Route path="/orders" element={<Orders/>} />
                        <Route path="/checkout/:id" element={<Wrapper/>}/>
                        <Route path="/NotificationCenter" element={<NotificationCenter/>}/>
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
                          <Route path="/dashboard/listOrders" element={<ListOrders/>}/>
                          <Route path="/dashboard/menageOrder/:id" element={<MenageOrder/>}/>

                          <Route path="/dashboard" element={<AdminDashboard />} />

                          <Route path="/dashboard/listParents" element={<ListParents/>}/>
                          <Route path="/dashboard/listChildren" element={<ListChildren/>}/>

                          {/* <Route path="/dashboard/listContracts" element={<ListContracts/>}/> */}
                          {/* <Route path="/dashboard/listEmployees" element={<ListEmployees/>}/> */}

                        </Route>
                      </Routes>
                    </div>
                  </div>
                </div>
              ) : (
                <div id="allContents">
                  <Navbar />
                  <div id="contentContainerWrapper">
                    <div className="contentContainer">
                      <Routes>
                      <Route path="/" element={<HomePage />} />
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
                        <Route path="/checkout/:id" element={<Wrapper/>}/>
                        <Route path="/NotificationCenter" element={<NotificationCenter/>}/>
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
                          <Route path="/dashboard/listOrders" element={<ListOrders/>}/>
                          <Route path="/dashboard/menageOrder" element={<MenageOrder/>}/>
                          <Route path="/dashboard" element={<AdminDashboard />} />

                          <Route path="/dashboard/listParents" element={<ListParents/>}/>
                          <Route path="/dashboard/listChildren" element={<ListChildren/>}/>

                          {/* <Route path="/dashboard/listEmployees" element={<ListEmployees/>}/> */}
                          

                          {/* <Route path="/dashboard/listContracts" element={<ListContracts/>}/> */}
                          


                        </Route>
                      </Routes>
                    </div>
                  </div>
                </div>
              )}
            </div>
            </PerfectScrollbar>
          </BrowserRouter>
          
        </>

      )}
      {/* </div> */}
    </>
    
    
  );
  
});

function componentDidMount() {
  throw new Error('Function not implemented.');
}

