import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MenuItem from './MenuItem';

function RestaurantDetail({ onAddToCart }) {
  const [restaurant, setRestaurant] = useState(null);
  const { id,name,description } = useParams();
  const API_GATEWAY_URL="http://localhost:8084"
  const SERVER_ADDR="http://localhost:9799"
  useEffect(() => {
    axios.get(SERVER_ADDR+`/api/restaurants/${id}/menu`)
      .then(response => {
        console.log(response.data);
        setRestaurant({ name: name, description: description, menuItems: response.data });
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  }, [id]);
  
  if (!restaurant) return <div>Loading...</div>;
  const menuItems = restaurant.menuItems || [];

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>
      {menuItems.map(item => (
        <MenuItem key={item.id} item={item} restaurant={restaurant} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default RestaurantDetail;