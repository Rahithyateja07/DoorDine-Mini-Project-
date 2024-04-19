import React from 'react';

function MenuItem({ item, restaurant, onAddToCart }) {
  return (
    <div style={styles.container}>
      <div style={styles.info}>
        <h3>{item.name} - ${item.price}</h3>
        <p>{item.description}</p>
        {/* <small style={styles.small}>Served at: {restaurant.name}</small>
        <p style={styles.smallDescription}>{restaurant.description}</p> */}
        <button onClick={() => onAddToCart(item)} style={styles.button}>Add to Cart</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  info: {
    paddingLeft: '15px'
  },
  small: {
    fontSize: '0.8rem',
    color: '#666',
    display: 'block', // Ensures it appears on a new line
  },
  smallDescription: {
    fontSize: '0.8rem',
    color: '#888',
    marginTop: '5px'
  },
  button: {
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px'
  }
};

export default MenuItem;