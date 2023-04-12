import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route  path="/login" element={<Login/>} />
        <Route  path="/" element={<App/>} />
        <Route  path="/signup" element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;