import React from 'react';
import logo from './logo.svg';
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
import ForgotPassword from '../../features/user/forgotPassword';
import VerifyAccount from '../../features/user/verifyAccount';
import LoggedInUserRoute from './LoggedInUserRoute';
import AdminNavbar from '../../features/admin/features/adminNavbar';


function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route  path={"/*"} element={<>
        <Navbar/>
        {/* <AdminNavbar/> */}
        <div>
          <Routes>
          <Route  path="/login" element={<LoginForm/>} />
          <Route  path="/signup" element={<Signup/>} />
          <Route  path="/" element={<HomePage/>} />
          <Route  path="/aboutus" element={<AboutUs/>} />
          <Route  path="/contactus" element={<ContactUs/>} />
          {/* <Route path="/adminNavbar" element={<AdminNavbar/>} /> */}
          <Route  path="/verifyaccount" element={<VerifyAccount/>}/>
          <Route  path="/changepw" element={<ChangePassword/>}/>
          <Route  path="/forgotpw" element={<ForgotPassword/>}/>

          <Route element={<LoggedInUserRoute/>}>
          <Route  path="/roleform" element={<RoleForm/>} />
          <Route  path="/list" element={<List/>}/>
          <Route  path="/roleform" element={<RoleForm/>}/>
        
          <Route path="/list" element={<List/>}/>
          <Route path="/roleform" element={<RoleForm/>}/>
          </Route>
          
          </Routes>

        </div>
        </>} />
       

      </Routes>
    </BrowserRouter>
  );
}
export default App;