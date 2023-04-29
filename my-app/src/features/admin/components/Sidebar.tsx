import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import "../assets/sidebar.css";

import { SidebarData } from "./SidebarData";

const Sidebar = () => {



  return (
    <>
      <IconContext.Provider value={{color: '#fff'}}>
        <div className="icon-container">
          <Link to="#" className="menu-bars">
            {/* <FaIcons.FaBars onClick={showSidebar} /> */}
            <h1>Food Delivery Company</h1>
          </Link>
          <div className="admin-info">
              <h4>Welcome Admin</h4>
              <FaIcons.FaSignOutAlt />
          </div>
        </div>
        <nav className="sidebar">
          <ul className="nav-menu-items">
            {/* <li className="toggle-btn">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </Link>
            </li> */}
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
