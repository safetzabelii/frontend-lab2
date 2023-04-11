import React, { useState } from "react";
import { FaHome, FaEllipsisV, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    
    <nav className="flex justify-between items-center text-green-900 px-8 py-4 border border-gray-300">
      <div className="flex items-center">
        <a href="/" className="flex items-center mr-8">
          <FaHome className="mr-2" />
          Home
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
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10">
              <a
                href="/"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-900"
              >
                About Us
              </a>
              <a
                href="/"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-900"
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
            <span className="mr-2">EN</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M17.225 8.661c.267.267.266.697-.003.964L13.23 13.23a.689.689 0 0 1-.974 0l-.806-.805-.806.805a.689.689 0 0 1-.974 0l-3.991-3.99c-.267-.267-.266-.697.003-.964.268-.267.697-.266.964.003l3.19 3.189V1.379c0-.38.308-.688.688-.688h1.379c.38 0 .688.308.688.688v10.475l3.19-3.189c.268-.269.697-.27.965-.003z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isLanguageOpen && (
            <div className="absolute right-0 mt-2 w-24 bg-white rounded-lg shadow-xl z-10">
              <a
                href="/"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-900"
              >
                EN
              </a>
              <a
                href="/"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-900"
              >
                AL
                </a>
        </div>
      )}
    </div>

    <a href="/" className="flex items-center mr-8">
      <FaSignInAlt className="mr-2" />
      Login
    </a>

    <a href="/" className="flex items-center">
      <FaUserPlus className="mr-2" />
      Sign Up
    </a>
  </div>
</nav>
);
};

export default Navbar;
