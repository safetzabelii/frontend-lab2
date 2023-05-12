
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import HomePage from './Homepage';
import AboutUs from './Aboutus';
import ContactUs from './Contactus';
import LoginForm from './LoginForm';

import Navbar from './navbar';
import Footer from './footer';

import LoggedInUserRoute from './ProtectedRoutes/LoggedInUserRoute';

import { store, useStore } from '../stores/store';
import MenuItem from '../../features/user/Menu/MenuItem/MenuItem';
import Restaurants from '../../features/user/Restaurant/Restaurants';
import UserAlreadyLoggedInRoute from './ProtectedRoutes/UserAlreadyLoggedInRoute';
import React, { useEffect } from 'react';
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
import ListRestaurants from '../../features/admin/pages/listRestaurants';
import ListOffers from '../../features/admin/offers/listOffers';
import ListUsers from '../../features/admin/users/listUsers';
import UserDetails from '../../features/admin/users/userDetails';
import ListMenus from '../../features/admin/menu/listMenus';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const verificationToken = store.commonStore.verificationToken;
  
  const {commonStore} = useStore();
  const cookies = commonStore.getCookies();
  let token = null;
  if (cookies) {
    token = cookies.token;  
  }
  
  return (
    <>
   <ToastContainer 
   position="top-right" 
   hideProgressBar
   autoClose={2000}
 
/>
   <BrowserRouter>
   <ModalContainer/>
    <div className="flex flex-row h-screen">
    
      <Routes>
        <Route  path={"/*"} element={<>
          
            <AdminNavbar/>
            
            <div className="flex-1">
         
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        
          <Routes>
          {
          /*
            Route me posht nuk lejon useri qe eshte i bam logged in 
            me shku ne routes te login edhe signup.
            Mos e fshi ose komento.
          */
        } 
          <Route element={<UserAlreadyLoggedInRoute/>}>
          <Route  path="/login" element={<LoginForm/>} />
          <Route  path="/signup" element={<Signup/>} />
          </Route>
          <Route  path="/" element={<HomePage/>} />
          <Route  path="/aboutus" element={<AboutUs/>} />
          <Route  path="/contactus" element={<ContactUs/>} />

          <Route  path="/menu" element={<MenuItem/>} />
          <Route  path="/restaurants" element={<Restaurants/>} />

          {
          // isAdmin && (
          //     <Route element={<AdminNavbar />}>
          //      <Route path="/admin" element={<AdminPanel />} />
          //       {/* Add more admin routes here */}
          //     </Route>
            // )
          }

          
          <Route  path="/verifyaccount" element={<VerifyAccount/>}/>
          {verificationToken ? (
            <Route
              path={`/verifyAccount/${verificationToken}`}
              element={<AccountVerified verificationToken={verificationToken} />}
            />
          ) : null}

          <Route  path="/sendEmail" element={<SendEmailForgetPassword/>}/>
            <Route  path="/changepw" element={<ChangePassword/>}/>
          {token ?(
          <Route  path={`/forgotPassword/${token}`} element={<ForgotPassword/>}/>
          ):null}
          
          <Route element={<LoggedInUserRoute/>}>
          </Route>
          <Route  path="/dashboard/listRoles" element={<ListRoles/>}/>
          <Route  path="/dashboard/roleCreateForm" element={<RoleCreateForm/>}/>
          <Route path="/dashboard/roleEditForm" element={<RoleEditForm/>}/>
          <Route path="/dashboard/listRestaurants" element={<ListRestaurants/>}/>
          <Route path="/dashboard/listOffers" element={<ListOffers/>}/>
          <Route path="/dashboard/userDetails/:id" element={<UserDetails/>}/>
          <Route path="/dashboard/listUsers" element={<ListUsers/>}/>
          <Route path="/dashboard/listMenus" element={<ListMenus/>}/>

          
          </Routes>
         

        </div>
        </div>
        </>} />
       

      </Routes>
      </div>
    </BrowserRouter>
    
    </>
    
  );
}
export default App;