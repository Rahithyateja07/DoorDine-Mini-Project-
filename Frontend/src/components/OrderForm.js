

  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { TextField, Button, Grid, Typography } from '@mui/material';
  import authService from '../Services/auth.service';
  function OrderForm({menuItems,currentUser,currentDate}) {
    const [order, setOrder] = useState({
      userEmail:'',
      phoneNumber: '',
      address: '',
      date: '',
      orderItems:''
    });
    //const [currentUser, setCurrentUser] = useState(undefined);
    const [date,setCurrentDate]=useState();
    // useEffect(() => {
      
    // }, []);
    useEffect(() => {
      // const currentDate = new Date().toISOString().split('T')[0];
      // //setOrder(prevOrder => ({ ...prevOrder, date: currentDate }));
      // setCurrentDate(currentDate)
      // console.log(currentDate)
      // console.log(order)
      }, []);
    
    const API_GATEWAY_URL="http://localhost:8084"
    const SERVER_ADDR="http://localhost:9799"
    useEffect(() => {
       
      
      //console.log(currentUser.username)
      
   
    
      // console.log(order)
      // const user = authService.getCurrentUser();
      // console.log(user)
      // if (user) {
      //   setCurrentUser(user);
      //   console.log(currentUser +"wdwa")
      //   setOrder({ ...order, userEmail: user });
      //   console.log(order)
      //   setCurrentUser(user)
      // }
       
        //setOrder({...order,orderItems: menuItems})
        const updatedOrder = {
          ...order,
          orderItems: menuItems,
          userEmail: currentUser,
          date: currentDate
      };
      setOrder(updatedOrder);
      // Retrieve user from localStorage
     
    }, []); // Run only once when component mounts
    const user = authService.getCurrentUser();
    const handleOrderChange = (e) => {
      const { name, value } = e.target;
      setOrder({ ...order, [name]: value });

    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
     
      setOrder({ ...order, userEmail: currentUser });
      setOrder({ ...order, date: date });
   
      console.log(order);
      axios.post(SERVER_ADDR+'/api/orders/submit', order)
        .then(response => {
          console.log('Order submitted successfully:', response.data);
          // Handle success, maybe redirect or show a success message
        })
        .catch(error => {
          console.error('Error submitting order:', error);
          // Handle error, maybe show an error message to the user
        });
    };
  
    return (
      <Grid container justifyContent="flex-start"> {/* Set justifyContent to 'flex-start' to align the form to the left */}
        <Grid item xs={12} sm={8} md={6}>
          <Typography variant="h4" gutterBottom>Place Your Order</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={order.phoneNumber}
              onChange={handleOrderChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              name="address"
              value={order.address}
              onChange={handleOrderChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>Place Order</Button>
          </form>
        </Grid>
      </Grid>
    );
  }
  
  export default OrderForm;
  