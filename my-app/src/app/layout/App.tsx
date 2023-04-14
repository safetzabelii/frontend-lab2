import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import HomePage from './Homepage';
import AboutUs from './Aboutus';

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route  path="/login" element={<Login/>} />
        <Route  path="/" element={<HomePage/>} />
        <Route  path="/signup" element={<Signup/>} />
        <Route  path="/aboutus" element={<AboutUs/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;