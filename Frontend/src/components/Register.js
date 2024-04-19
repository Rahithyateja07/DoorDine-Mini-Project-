import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import authService from '../Services/auth.service';
import { useNavigate } from "react-router-dom";

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

const RegisterForm = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Check if password and confirm password match
//     if (password !== confirmPassword) {
//       setError("Passwords don't match");
//       return;
//     }
//     // Reset error message
//     setError('');
//     // Here you can implement your registration logic
//     console.log('Username:', username);
//     console.log('Password:', password);
//     console.log('Email:', email);
//     // Clear the form fields after submission
//     setUsername('');
//     setPassword('');
//     setConfirmPassword('');
//     setEmail('');
//   };
const navigate = useNavigate();
const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(email, password).then(
        () => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);
          navigate("/login");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box boxShadow={3} p={3} className={classes.formContainer}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleSignup}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            id="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          
          {error && <Typography variant="body2" color="error">{error}</Typography>}
          <br></br><br></br>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            
            Register
          </Button>
          <br></br><br></br>
          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <Link href="/login" variant="body2">
              Login
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterForm;
