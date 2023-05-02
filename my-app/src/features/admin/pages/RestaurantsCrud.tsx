import React, { useState, useEffect } from 'react';
import agent from '../../../app/api/agent'; 
import { Restaurant } from '../../../app/models/Menu/Restaurant';


const RestaurantsCrud: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState('');

  const fetchRestaurants = async () => {
    const fetchedRestaurants = await agent.Restaurants.list();
    setRestaurants(fetchedRestaurants);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedRestaurant) {
      await agent.Restaurants.update({ ...selectedRestaurant, name, address, phoneNumber, image });
      setSelectedRestaurant(null);
    } else {
      await agent.Restaurants.create({ id: '', name, address, phoneNumber, image });
    }
    setName('');
    setAddress('');
    setPhoneNumber('');
    setImage('');
    fetchRestaurants();
  };

  const handleEdit = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setName(restaurant.name);
    setAddress(restaurant.address);
    setPhoneNumber(restaurant.phoneNumber);
    setImage(restaurant.image);
  };

  const handleDelete = async (id: string) => {
    await agent.Restaurants.delete(id);
    fetchRestaurants();
  };

  return (
    <div className='restaurants'>
      <h2>Restaurants</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter image URL"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />
        <button type="submit">{selectedRestaurant ? 'Update' : 'Create'}</button>
      </form>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            {restaurant.name} - {restaurant.address} - {restaurant.phoneNumber}
            <button onClick={() => handleEdit(restaurant)}>Edit</button>
            <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantsCrud;
