import React, { useState } from "react";
import { FaHome, FaEllipsisV, FaSignInAlt, FaUserPlus, FaLanguage } from "react-icons/fa";

const Navbar = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

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
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative mr-8">
          <button
            className="flex items-center"
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
          >
            <FaLanguage className="mr-2" />
            <span className="mr-2">EN</span>
            
            
          </button>

          {isLanguageOpen && (
            <div className="absolute right-0 mt-2 w-24 bg-white rounded-lg shadow-xl z-10">
              <a
                href="/"
                className="flex items-center hover:bg-green-50 bg-white text-green-800 font-bold py-4 px-8  shadow-lg transition duration-300"
              >
                EN
              </a>
              <a
                href="/"
                className="flex items-center hover:bg-green-50 bg-white text-green-800 font-bold py-4 px-8  shadow-lg transition duration-300"
              >
                AL
                </a>
        </div>
      )}
    </div>

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
  </div>
</nav>
);
};

export default Navbar;
