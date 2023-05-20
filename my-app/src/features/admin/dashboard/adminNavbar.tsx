import React, { useState, useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaPizzaSlice } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { HiMenuAlt2 } from "react-icons/hi";
import { observer } from "mobx-react";

export default observer(function AdminNavbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { userStore } = useStore();
  const { logout, user } = userStore;
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
    window.location.reload();
  };
  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

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
                  href="/orders"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <FaPizzaSlice className="w-5 h-5" />
                  <span>Orders</span>
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
            </ul>
          </nav>
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