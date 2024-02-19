import React, { useState, useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaPizzaSlice } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { HiMenuAlt2 } from "react-icons/hi";
import { observer } from "mobx-react";
import { BellIcon } from "@heroicons/react/24/outline";
import { NotificationModel } from "../../../app/models/Notification/NotificationModel";

export default observer(function AdminNavbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { userStore ,notificationStore} = useStore();
  const { logout, user } = userStore;
  const {notifications,notificationReqistry,markNotificationAsRead,markAllNotificationsAsRead,loadNotifications} = notificationStore;
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    notificationReqistry.clear();
    navigate("/login");
    window.location.reload();
  };
  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
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
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    
    
    <div className="flex">
      <div className={`h-screen w-64 bg-gray-900 text-white ${isSidebarOpen ? "" : "hidden"}`}>
        <div className="p-4">
          <div className="flex items-center justify-center mb-6">
            <FaPizzaSlice className="text-4xl mr-2" />
            <h2 className="text-2xl font-bold">Admin Panel</h2>
          </div>
          <nav>
            <ul className="space-y-2">
              <li className="px-4 py-2 rounded">
                <a
                  href="/dashboard"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <RiDashboardLine className="w-5 h-5" />
                  <span>Dashboard</span>
                </a>
              </li>
              <li className="px-4 py-2 rounded">
                <a
                  href="/dashboard/listRoles"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <AiOutlineUser className="w-5 h-5" />
                  <span>Roles</span>
                </a>
              </li>
              <li className="px-4 py-2 rounded">
                <a
                  href="/dashboard/listUsers"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <AiOutlineUser className="w-5 h-5" />
                  <span>Users</span>
                </a>
              </li>
              <li className="px-4 py-2 rounded">
                <a
                  href="/dashboard/listRestaurants"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <FaPizzaSlice className="w-5 h-5" />
                  <span>Restaurants</span>
                </a>
              </li>
              <li className="px-4 py-2 rounded">
                <a
                  href="/dashboard/listOffers"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <FaPizzaSlice className="w-5 h-5" />
                  <span>Offers</span>
                </a>
              </li>
              <li className="px-4 py-2 rounded">
                <a
                  href="/dashboard/listMenus"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <FaPizzaSlice className="w-5 h-5" />
                  <span>Menu</span>
                </a>
              </li>
              <li className="px-4 py-2 rounded">
                <a
                  href="/dashboard/listMenuItems"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <FaPizzaSlice className="w-5 h-5" />
                  <span>Menu Items</span>
                </a>
              </li>
              <li className="px-4 py-2 rounded">
                <a
                  href="/dashboard/listOrders"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>

                  <span>Orders</span>
                </a>
              </li>
              {/* <li className="px-4 py-2 rounded">
                <a
                  href="/dashboard/listSmundjet"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <FaPizzaSlice className="w-5 h-5" />
                  <span>Smundjet</span>
                </a>
              </li> */}
              {/* <li className="px-4 py-2 rounded">
                <a
                  href="/dashboard/listSpecializimet"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <FaPizzaSlice className="w-5 h-5" />
                  <span>Specializimet</span>
                </a>
              </li> */}

              {/* <li className="px-4 py-2 rounded">
                <a
                  href="/dashboard/listAuthors"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <FaPizzaSlice className="w-5 h-5" />
                  <span>Authors</span>
                </a>
              </li> */}

              {/* <li className="px-4 py-2 rounded">
                <a
                  href="/dashboard/listBooks"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <FaPizzaSlice className="w-5 h-5" />
                  <span>Books</span>
                </a>
              </li> */}

              <li className="px-4 py-2 rounded">
                <a
                  href="/dashboard/listParents"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <FaPizzaSlice className="w-5 h-5" />
                  <span>Chefs</span>
                </a>
              </li>

              <li className="px-4 py-2 rounded">
                <a
                  href="/dashboard/listChildren"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <FaPizzaSlice className="w-5 h-5" />
                  <span>Recipes</span>
                </a>
              </li>



              
              {/* <li className="px-4 py-2 rounded">
                <a
                  href="/dashboard/listEmployees"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <FaPizzaSlice className="w-5 h-5" />
                  <span>Employees</span>
                </a>
              </li>

              <li className="px-4 py-2 rounded">
                <a
                  href="/dashboard/listContracts"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <FaPizzaSlice className="w-5 h-5" />
                  <span>Contracts</span>
                </a>
              </li> */}




              <li className="px-4 py-2 rounded">
                <a
                  href={`/dashboard/menageOrder/${userStore.user?.id}`}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>

                  <span>Manage Order</span>
                </a>
              </li>
            </ul>
          </nav>
          
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
    <div className="absolute left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md w-300px" style={{ width: "300px" }}>
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

          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full bg-slate-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            <FiLogOut className="mr-2" />
            Log Out
          </button>
        </div>
      </div>
      

     {/* Toggle button */}
     <button
        onClick={handleToggleSidebar}
        className={`fixed top-0 right-0 m-4 bg-gray-900 text-white rounded-md p-2 ${
          isSidebarOpen ? "hidden" : ""
        } md:hidden`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <button
        onClick={handleToggleSidebar}
        className={`fixed top-0 right-0 m-4 bg-gray-900 text-white rounded-md p-2 ${
          !isSidebarOpen ? "hidden" : ""
        } md:hidden`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
});