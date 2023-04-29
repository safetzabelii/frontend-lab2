import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";



export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Users',
        path: '/dashboard/users',
        icon: <FaIcons.FaUsers />,
        cName: 'nav-text'
    },
    {
        title: 'Roles',
        path: '/dashboard/roles',
        icon: <FaIcons.FaUsers />,
        cName: 'nav-text'
    },
    {
        title: 'Restaurants',
        path: '/dashboard/restaurants',
        icon: <FaIcons.FaUsers />,
        cName: 'nav-text'
    },
    {
        title: 'Menus',
        path: '/dashboard/menus',
        icon: <FaIcons.FaUsers />,
        cName: 'nav-text'
    },
    
    {
        title: 'Orders',
        path: '/dashboard/orders',
        icon: <FaIcons.FaUsers />,
        cName: 'nav-text'
    },

    {
        title: 'Delivery Cars',
        path: '/dashboard/delivery cars',
        icon: <FaIcons.FaUsers />,
        cName: 'nav-text'
    },
    
    {
        title: 'Delivery Drivers',
        path: '/dashboard/reservations',
        icon: <FaIcons.FaUsers />,
        cName: 'nav-text'
    },
];
