
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import HomePage from './Homepage';
import AboutUs from './Aboutus';
import ContactUs from './Contactus';
import LoginForm from './LoginForm';
import List from '../../features/admin/role/list';
import Navbar from './navbar';
import Footer from './footer';
import RoleForm from '../../features/admin/role/roleForm';
import ChangePassword from '../../features/user/changePassword';

import VerifyAccount from '../../features/user/verifyAccount';
import LoggedInUserRoute from './ProtectedRoutes/LoggedInUserRoute';
import AdminNavbar from '../../features/admin/features/adminNavbar';
import { store, useStore } from '../stores/store';
import MenuItem from '../../features/user/Menu/MenuItem/MenuItem';
import Restaurants from '../../features/user/Restaurant/Restaurants';
import AccountVerified from '../../features/user/accountVerified';
import UserAlreadyLoggedInRoute from './ProtectedRoutes/UserAlreadyLoggedInRoute';
import SendEmailForgetPassword from '../../features/user/sendEmailForgetPassword';
import React, { useEffect } from 'react';
import agent from '../api/agent';

// Admin
import Sidebar from '../../features/admin/components/Sidebar';
import RestaurantsCrud from '../../features/admin/pages/RestaurantsCrud';

import ForgotPassword from '../../features/user/forgotPassword';
import AdminPanel from '../../features/admin/features/adminPanel';

function App() {
  const verificationToken = store.commonStore.verificationToken;
  const pathname = window.location.pathname;
  
  const {commonStore} = useStore();
  const cookies = commonStore.getCookies();
  let token = null;
  if (cookies) {
    token = cookies.token;  
  }
 

  
  const renderHeader = (pathname:any) => {
    if (pathname.includes('/dashboard')) {
      return <Sidebar />;
    }
  };


  return (
   <BrowserRouter>
    <div className="flex flex-row h-screen">
      <Routes>
        <Route  path={"/*"} element={<>
          
            <AdminNavbar/>
            {/* <AdminNavbar/> */}
            <div className="flex-1">
         
       
        {renderHeader(pathname)}
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

          <Route path="/sidebar" element={<Sidebar/>} />
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
          <Route  path="/roleform" element={<RoleForm/>} />
          <Route  path="/listRoles" element={<List/>}/>
          <Route  path="/roleform" element={<RoleForm/>}/>
        
          <Route path="/list" element={<List/>}/>
          <Route path="/roleform" element={<RoleForm/>}/>
          
          
          </Routes>
         

        </div>
        </div>
        </>} />
       

      </Routes>
      </div>
    </BrowserRouter>
    
  );
}
export default App;