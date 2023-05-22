import { observer } from "mobx-react";
import { useStore } from "../../../app/stores/store";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "../../../app/models/Menu/Restaurant";
import { SyntheticEvent, useEffect, useState } from "react";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default observer(function Restaurants() {
  const { restaurantStore } = useStore();
  const { loadRestaurants, deleteRestaurant, getRestaurants } = restaurantStore;
  const [target, setTarget] = useState("");

  function handleRestaurantDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteRestaurant(id);
  }

  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  const handleOrderClick = (restaurantId: string) => {
    // Handle order click logic
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Restaurants</h1>
      {restaurantStore.loadingInitial ? (
        <p>Loading restaurants...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {restaurantStore.restaurantsByName.map((restaurant) => (
            <div
              className="relative transform-gpu transition-transform duration-300 ease-in-out hover:scale-105"
              key={restaurant.id}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                  <h2 className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white">
                    {restaurant.name}
                  </h2>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Address:</span> {restaurant.address}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Phone:</span> {restaurant.phoneNumber}
                  </p>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleOrderClick(restaurant.id)}
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
