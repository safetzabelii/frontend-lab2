import React, { useEffect, useState } from "react";
import { FaHome, FaEllipsisV, FaSignInAlt, FaUserPlus, FaLanguage, FaListAlt } from "react-icons/fa";
import { useStore } from "../stores/store";
import { useNavigate } from "react-router-dom";
import { BellIcon } from "@heroicons/react/24/outline";
import { NotificationModel } from "../models/Notification/NotificationModel";


const Navbar = () => {
  const {userStore,cartStore,notificationStore} = useStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const {logout,user} = userStore;
  const{numberOfItemInCart} = cartStore;
  const {notifications,markNotificationAsRead,notificationReqistry,markAllNotificationsAsRead,loadNotifications} = notificationStore;
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const navigate = useNavigate();
 
  const handleLogout = () => {
    logout();
    notificationReqistry.clear();
    navigate("/login");
  };
  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  const handleNotificationClick = (notification:NotificationModel)=>{
    if(notification.isRead === false){
      markNotificationAsRead(notification.id,user?.id!);
    }
  }
  const handleMarkAllAsRead= ()=>{
    markAllNotificationsAsRead(user?.id!);
  }
  

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
          <div className="relative">
  <button
    className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none"
    onClick={handleToggleNotifications}
  >
    <BellIcon className="h-6 w-6" />
    {notifications.some((notification) => !notification.isRead) && (
      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
    )}
  </button>

  {showNotifications && (
    <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md w-300px" style={{ width: "300px" }}>
      <div className="p-4 border-b border-gray-200">
        <a href="/NotificationCenter"><h2 className="text-lg font-semibold">Notifications</h2></a>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleMarkAllAsRead}>Mark All as Read</button>
      </div>
      <ul className="divide-y divide-gray-200">
        {notifications.map((notification, index) => (
          <li
            key={index}
            className={`p-4 ${!notification.isRead ? 'font-bold' : ''}`}
            onClick={() => handleNotificationClick(notification)}
          >
            <a href={notification.link} className="text-blue-500 hover:underline">
              <h3 className="text-base font-semibold">{notification.title}</h3>
            </a>
            <p className="text-sm text-gray-600">{notification.message}</p>
          </li>
        ))}
      </ul>
    </div>
  )}
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
