import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";

export default observer(function Order() {
  const { orderStore, restaurantStore, menuStore } = useStore();
  const { loadOrders, orders } = orderStore;
  const { loadRestaurants, getRestaurants } = restaurantStore;
  const { loadMenus, menus } = menuStore;

  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");

  useEffect(() => {
    loadOrders();
    loadRestaurants();
    loadMenus();
  }, [loadOrders, loadRestaurants, loadMenus]);

  // Filters
  const filteredOrders = orders.filter((order) => {
    // if (selectedRestaurant) {
    //   return false;
    // }
    // if (selectedMenu && !order.orderitem.some((item) => item.menuId === selectedMenu)) {
    //   return false;
    // }
    // return true;
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center mb-4">
        <div className="flex items-center mb-2">
          <label htmlFor="restaurantFilter" className="mr-2">
            Restaurant:
          </label>
          <select
            id="restaurantFilter"
            className="border rounded-md px-2 py-1"
            value={selectedRestaurant}
            onChange={(e) => setSelectedRestaurant(e.target.value)}
          >
            <option value="">All Restaurants</option>
            {getRestaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center mb-2 ml-4">
          <label htmlFor="menuFilter" className="mr-2">
            Menu:
          </label>
          <select
            id="menuFilter"
            className="border rounded-md px-2 py-1"
            value={selectedMenu}
            onChange={(e) => setSelectedMenu(e.target.value)}
          >
            <option value="">All Menus</option>
            {menus.map((menu) => (
              <option key={menu.id} value={menu.id}>
                {menu.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Orders */}
      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredOrders.map((order) => (
            <li key={order.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold">{order.user}</h2>
                  <span className="text-gray-600">Order ID: {order.id}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Order Items:</h3>
                  <ul className="mb-4">
                    {/* {order.orderitem.map((item) => (
                      <li key={item.orderItemId} className="text-gray-600">
                        {item.menuName} - {item.price}
                      </li>
                    ))} */}
                  </ul>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Total:</span> {order.total}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">User:</span> {order.user}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
