import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import HomePage from './Homepage';
import AboutUs from './Aboutus';
import ContactUs from './Contactus';
import LoginForm from '../features/users/LoginForm';
import RoleForm from '../../features/RoleForm';

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route  path="/login" element={<LoginForm/>} />
        <Route  path="/" element={<HomePage/>} />
        <Route  path="/signup" element={<Signup/>} />
        <Route  path="/aboutus" element={<AboutUs/>} />
        <Route  path="/contactus" element={<ContactUs/>} />
        <Route  path="/roleform" element={<RoleForm/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;