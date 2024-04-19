import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import OrderForm from './OrderForm';
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import authService from '../Services/auth.service';
function Cart({ cartItems, onRemoveFromCart }) {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentDate,setCurrentDate] = useState()
  useEffect(() => {
    const user = authService.getCurrentUser();
   
    if (user) {
      setCurrentUser(user);
    }
    const date = new Date().toISOString().split('T')[0];
    setCurrentDate(date)
  }, []);

  // const viewCart = () =>{
  //   console.log(cartItems);
  // }
  return (
    <div>
      <h1>Cart ({totalItems} items)</h1>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} style={styles.cartItem}>
            {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            <button onClick={() => onRemoveFromCart(item.id)} style={styles.removeButton}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
      <div>Total: ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</div>
      <br></br>
      <br></br>
      {/* <button onClick={() => viewCart()} ></button> */}
      {currentUser ? 
        (
          <OrderForm menuItems={cartItems} currentUser={currentUser} currentDate={currentDate}/>
            
        ):(
          <div>
            <Typography variant="body2" align="left">
             Not Logged In? 
          
            </Typography>
        
            <button fullWidth
            variant="contained"
            color="primary"
            > 
            <Link to="/login" style={styles.navItem}>
                 Login 
                </Link></button>
              </div>
        )}
      
    </div>
  );
}

const styles = {
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    listStyleType: 'none',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px'
  },
  removeButton: {
    marginLeft: '10px',
    background: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '5px 10px'
  },
};

export default Cart;
