import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Grid } from '@mui/material';

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const API_GATEWAY_URL="http://localhost:8084"
  const SERVER_ADDR="http://localhost:9799"
  useEffect(() => {
    const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    // Fetch orders from the server
    axios.get(SERVER_ADDR+'/api/orders/getAllOrders/'+currentUser.username)
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      {orders.map(order => (
        <Grid item xs={12} key={order.orderId}>
          <Box boxShadow={3} p={3} borderRadius={4}>
            <Typography variant="h6">Order ID: {order.orderId}</Typography>
            <Typography>User Email: {order.userEmail}</Typography>
            <Typography>Phone Number: {order.phoneNumber}</Typography>
            <Typography>Date: {order.date}</Typography>
            <Typography>Address: {order.address}</Typography>
            <Typography variant="h6">Order Items:</Typography>
            {order.orderItems.map(item => (
              <Typography key={item.orderItemId}>
                {item.name} - Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
              </Typography>
            ))}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default OrdersList;
