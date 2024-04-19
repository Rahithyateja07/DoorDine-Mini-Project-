import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useNavigate } from "react-router-dom";
import authService from '../Services/auth.service';
import OrdersList from './OrdersList';
import ContactUs from './ContactUs';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogout = () => {
    authService.logout();
    setOpenLogoutDialog(false);
    // Redirect user or do additional cleanup
    console.log('Logged out');
    navigate('/');
    window.location.reload();
  };

  const navigate = useNavigate();
  const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ width: '250px', borderRight: '1px solid #ccc' }}>
        <List component="nav">
          <ListItem button selected={activeTab === 'user'} onClick={() => handleTabChange('user')}>
            <ListItemText primary="User Profile" />
          </ListItem>
          <ListItem button selected={activeTab === 'orders'} onClick={() => handleTabChange('orders')}>
            <ListItemText primary="Past Orders" />
          </ListItem>
          <ListItem button onClick={() => handleTabChange('contact')}>
            <ListItemText primary="Contact Us" />
          </ListItem>
          <ListItem button onClick={() => setOpenLogoutDialog(true)}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {activeTab === 'user' && currentUser && (
          <Typography variant="h6">
            Welcome, {currentUser.username}
          </Typography>
        )}
        {activeTab === 'orders' && (
          <Typography variant="h6">
            Past Orders
            <OrdersList></OrdersList>
          </Typography>
        )}
        {activeTab === 'contact' && (
          <Typography variant="h6">
            Contact Us
            <Box mt={2}>
              <Typography variant="body1">
               <ContactUs></ContactUs>
              </Typography>
            </Box>
          </Typography>
        )}
        <Dialog open={openLogoutDialog} onClose={() => setOpenLogoutDialog(false)}>
          <DialogTitle>Do you wish to logout?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setOpenLogoutDialog(false)}>Cancel</Button>
            <Button onClick={handleLogout} color="primary" autoFocus>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Profile;
