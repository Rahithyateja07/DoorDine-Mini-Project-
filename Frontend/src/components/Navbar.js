// src/components/Navbar.js
import React, { useEffect, useState  } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSignInAlt, FaUser, FaUserCircle } from 'react-icons/fa';
import { FaBowlFood } from 'react-icons/fa6';
import authService from '../Services/auth.service';

function Navbar({ cartItemCount }) {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // const logOut = () => {
  //   authService.logout();
  // };
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoText}>DoorDine</Link>
        <FaBowlFood style={{ marginLeft: '10px' }} />
      </div>
      <div style={styles.navItems}>
        <Link to="/" style={styles.navItem}>Restaurants</Link>
        <Link to="/aboutUs" style={styles.navItem}>About Us</Link>
        <Link to="/cart" style={styles.navItem}>
          <FaShoppingCart />
          <span style={styles.cartCount}> ({cartItemCount})</span>
        </Link>
        {currentUser ? 
        (
          <Link to="/profile" style={styles.navItem}>
              <FaUserCircle/>
              </Link>
            
        ):(
          <Link to="/login" style={styles.navItem}>
              <FaUserCircle/>
              </Link>
        )}
      
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: '#333',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif'
  },
  logo: {
    fontSize: '1.5rem'
  },
  logoText: {
    color: '#fff',
    textDecoration: 'none'
  },
  navItems: {
    display: 'flex',
    alignItems: 'center'
  },
  navItem: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.2rem',
    marginLeft: '20px',
    display: 'flex',
    alignItems: 'center'
  },
  cartCount: {
    fontSize: '0.8rem',
    marginLeft: '5px'
  }
};

export default Navbar;
