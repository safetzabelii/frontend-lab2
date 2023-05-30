import React, { useEffect, useState } from "react";
import { FaHome, FaEllipsisV, FaSignInAlt, FaUserPlus, FaLanguage, FaListAlt } from "react-icons/fa";
import { useStore } from "../stores/store";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const {userStore,cartStore} = useStore();
  const {logout,user} = userStore;
  const{getNumberOfItemsInCart,numberOfItemInCart} = cartStore;
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const navigate = useNavigate();
 
  const handleLogout = () => {
    logout()
    navigate("/login");
  };
  

  return (
    
    <nav className="flex justify-between items-center text-green-900 px-8 py-4 border border-gray-300">
      <div className="flex items-center">
        <a href="/" className="mr-8">
          <button className="flex items-center bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-8 rounded-full shadow-lg transition duration-300">
            <FaHome className="mr-2" />
            Home
          </button>
        </a>

        <div className="relative">
          <button
            className="flex items-center justify-between"
            onClick={() => setIsMoreOpen(!isMoreOpen)}
          >
            <FaEllipsisV className="mr-2" />
            More
          </button>

          {isMoreOpen && (
            <div className="absolute left mt-8 w-48 bg-white rounded-lg shadow-xl z-10">
              <a
                href="/aboutus"
                className="flex items-center hover:bg-green-50 bg-white text-green-800 font-bold py-4 px-8  shadow-lg transition duration-300"
              >
                About Us
              </a>
              <a
                href="/contactus"
                className="flex items-center hover:bg-green-50 bg-white text-green-800 font-bold py-4 px-8  shadow-lg transition duration-300"
              >
                Contact Us
              </a>
              <a
                href="/menu"
                className="flex items-center hover:bg-green-50 bg-white text-green-800 font-bold py-4 px-8  shadow-lg transition duration-300"
              >
                Menu
              </a>
              <a
                href="/restaurants"
                className="flex items-center hover:bg-green-50 bg-white text-green-800 font-bold py-4 px-8  shadow-lg transition duration-300"
              >
                Restaurants
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center">    
        <div className="mr-4">
          <a href={`/cartDetails/${userStore.user?.id}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          {numberOfItemInCart ==0 ?(null):(
            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute top-8 right-19 transform translate-x-1/2 -translate-y-1/2">
        {numberOfItemInCart}
        </span>
          )}
          </a>
          </div>
        {userStore.isLoggedIn ? (
  <>
    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-8">
      Log out
    </button>

   
     
  </>
) : (
  <>
    <a href="/login" className="flex items-center mr-8">
      <button className="flex items-center bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-8 rounded-full shadow-lg transition duration-300">
        <FaSignInAlt className="mr-2" />
        Login
      </button>
    </a>

    <a href="/signup" className="flex items-center">
      <FaUserPlus className="mr-2" />
      Sign Up
    </a>
  </>
)}
   
  </div>
</nav>
);
};

export default Navbar;
