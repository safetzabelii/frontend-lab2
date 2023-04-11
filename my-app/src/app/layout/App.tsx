import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Login/>} />
        <Route  path="/app" element={<App/>} />
      </Routes>
    </BrowserRouter>
  );
}
    <div className="bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <a href="#" className="text-gray-800 text-xl font-bold">
                Food Delivery
              </a>
            </div>
            <div className="flex items-center">
              <a href="#" className="text-gray-800 mx-4 hover:text-gray-600">
                Menu
              </a>
              <a href="#" className="text-gray-800 mx-4 hover:text-gray-600">
                About
              </a>
              <a href="#" className="text-gray-800 mx-4 hover:text-gray-600">
                Contact
              </a>
              <a
                href="#"
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
              >
                Order Now
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto mt-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1541696436-5e6a5c43fe5a"
              alt="food"
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-gray-800 font-bold text-xl mb-2">
                Spicy Noodles
              </h2>
              <p className="text-gray-600 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                facilisi.
              </p>
              <p className="text-gray-800 font-bold mt-2">$12</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
              alt="food"
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-gray-800 font-bold text-xl mb-2">
                BBQ Ribs
              </h2>
              <p className="text-gray-600 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                facilisi.
              </p>
              <p className="text-gray-800 font-bold mt-2">$20</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1613739540982-67f326a9810e"
              alt="food"
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-gray-800 font-bold text-xl mb-2">
                Margherita Pizza
              </h2>
              <p className="text-gray-600 text-base"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
</p>
<p className="text-gray-800 font-bold mt-2">$16</p>
</div>
</div>
</div>
</div>
<div className="bg-yellow-500 py-8">
<div className="container mx-auto px-4">
<h2 className="text-white text-2xl font-bold mb-4">
Why Choose Us?
</h2>
<div className="flex items-center justify-between">
<div className="flex-1 mr-4">
<h3 className="text-white font-bold text-lg mb-2">
Wide Selection
</h3>
<p className="text-white text-base">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
facilisi. Sed in magna in metus facilisis imperdiet.
</p>
</div>
<div className="flex-1 mr-4">
<h3 className="text-white font-bold text-lg mb-2">
Fast Delivery
</h3>
<p className="text-white text-base">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
facilisi. Sed in magna in metus facilisis imperdiet.
</p>
</div>
<div className="flex-1 mr-4">
<h3 className="text-white font-bold text-lg mb-2">
Quality Ingredients
</h3>
<p className="text-white text-base">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
facilisi. Sed in magna in metus facilisis imperdiet.
</p>
</div>
</div>
</div>
</div>
<footer className="bg-gray-800 py-8">
<div className="container mx-auto px-4">
<p className="text-white text-center">© 2023 Food Delivery</p>
</div>
</footer>
</div>


export default App;