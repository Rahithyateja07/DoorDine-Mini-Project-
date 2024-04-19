  import React, { useState } from 'react';
  import { TextField, Button, Typography, Container, Box, Link } from '@mui/material';
  import { makeStyles } from '@mui/styles';
  import authService from '../Services/auth.service';
  import { useNavigate } from "react-router-dom";

  const useStyles = makeStyles((theme) => ({
    formContainer: {
      marginTop: theme.spacing(8), // Provide spacing from the top
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Full width
      marginTop: theme.spacing(3), // Margin top with spacing of 3 units
    },
    submit: {
      margin: theme.spacing(3, 0, 2), // Margin with spacing units
    },
  }));

  const LoginForm = () => {
    const classes = useStyles();
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
    const navigate = useNavigate();
    const handleLogin = async (event) => {
      event.preventDefault();
      // Here you can implement your login logic, such as sending the username and password to a server
      // console.log('Username:', username);
      // console.log('Password:', password);
      // // Clear the form fields after submission
      // setUsername('');
      // setPassword('');
      try {
          await authService.login(email, password).then(
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
    };

    return (
      <Container component="main" maxWidth="xs">
        <Box boxShadow={3} p={3} className={classes.formContainer}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleUsernameChange}
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
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>

            <br></br><br></br>
            <Typography variant="body2" align="center">
            <Link  href="/forgot-password" variant="body2">
              Forgot Password?
            </Link>
          </Typography>
          </form>
          <br></br>
          <Typography variant="body2" align="center">
            Don't have an account?{' '}
            <Link href="/register" variant="body2">
              Register
            </Link>
          </Typography>
        </Box>
      </Container>
    );
  };

  export default LoginForm;
