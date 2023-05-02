import React, { useState, useEffect } from 'react';
import agent from '../../../app/api/agent'; 
import { Restaurant } from '../../../app/models/Menu/Restaurant';
import '../assets/restaurants.css'; // Import the CSS file

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
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className="form-control"
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            className="form-control"
            placeholder="Enter address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            type="text"
            className="form-control"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            type="text"
            className="form-control"
            placeholder="Enter image URL"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {selectedRestaurant ? 'Update' : 'Create'}
        </button>
      </form>
      <ul className="restaurant-list">
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <div className="restaurant-info">
              <div className="restaurant-name">{restaurant.name}</div>
              <div className="restaurant-address">{restaurant.address}</div>
              <div className="restaurant-phone">{restaurant.phoneNumber}</div>
            </div>
            <div className="restaurant-actions">
              <button onClick={() => handleEdit(restaurant)} className="btn btn-primary">
                Edit
              </button>
              <button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantsCrud;
