import React, { useEffect, useState } from "react";
import agent from "../../../app/api/agent";
import { OrderForDisplayDto } from "../../../app/models/Order/OrderForDisplayDto";
import "../assets/topOrdersPage.css";

const TopOrdersPage = () => {
  const [topOrders, setTopOrders] = useState<OrderForDisplayDto[]>([]);

  useEffect(() => {
    loadTopOrders();
  }, []);

  const loadTopOrders = async () => {
    try {
      const response = await agent.Orders.getTopSellers();
      const sortedOrders = response.sort((a: OrderForDisplayDto, b: OrderForDisplayDto) => b.menuItems.length - a.menuItems.length);
      setTopOrders(sortedOrders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="top-orders-container">
      <h1>Top Orders</h1>
      <div className="flex flex-wrap justify-center mx-auto max-w-screen-lg">
      {topOrders.map((order) => (
        <div key={order.id} className="order-card">
          <h3>Order ID: {order.id}</h3>
          <p>User: {order.user}</p>
          <p>Order Items: {order.menuItems.length}</p>
          <p>Total: {order.total}</p>
        </div>
      ))}
      </div>    
    </div>
  );
};

export default TopOrdersPage;
