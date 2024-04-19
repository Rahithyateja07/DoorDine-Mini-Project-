import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Login from './components/Login'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import RegisterForm from './components/Register';
import Profile from './components/Profile';
import ContactUs from './components/ContactUs';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import AboutUs from './components/AboutUs';


function App() {
  const [cartItems, setCartItems] = useState([]);
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const theme = createTheme();

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((i) => i.id === item.id);
      if (itemIndex > -1) {
        const newCartItems = [...prevItems];
        newCartItems[itemIndex].quantity += 1;
        return newCartItems;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.reduce((acc, item) => {
      if (item.id === itemId) {
        if (item.quantity > 1) {
          acc.push({ ...item, quantity: item.quantity - 1 });
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []));
  };

  return (
    <ThemeProvider theme={theme}>
      {

    <Router>
      <Navbar cartItemCount={cartItemCount} />
      <Routes>
  <Route path="/" element={<RestaurantList />} />
  {/* <Route path="/restaurants/:id" element={<RestaurantDetail onAddToCart={handleAddToCart} />} /> */}
  <Route path="/restaurants/:id/:name/:description" element={<RestaurantDetail onAddToCart={handleAddToCart} />} />
 
  <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />} />
  <Route path="/login" element={<Login></Login>}/>
  <Route path="/register" element={<RegisterForm></RegisterForm>}/>
  <Route path="/profile" element={<Profile></Profile>}/>
  <Route path="/contactus" element={<ContactUs></ContactUs>}/>
  <Route path="/aboutUs" element={<AboutUs></AboutUs>}/>
  <Route path="/forgot-password" element={<ForgotPasswordForm></ForgotPasswordForm>}/> 
</Routes>
    </Router>
    }
   
      </ThemeProvider>
  );
}

export default App;
