import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";

import authService from '../Services/auth.service';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const API_GATEWAY_URL = "http://localhost:8084";
const API_URL = "http://localhost:8095";

const ForgotPasswordForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    // Here you can implement your logic for resetting the password with the new password provided
    // and the email entered by the user
   
    // After resetting the password, you can navigate to the login page or any other relevant page
    try {
      await authService.updatePassword(email, newPassword).then(
        () => {
          navigate("/");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
    navigate("/login");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box boxShadow={3} p={3} className={classes.formContainer}>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} onSubmit={handleResetPassword}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="New Password"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset Password
          </Button>
        </form>
        <br></br>
        <Typography variant="body2" align="center">
          Remember your password?{' '}
          <Link href="/login" variant="body2">
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default ForgotPasswordForm;
