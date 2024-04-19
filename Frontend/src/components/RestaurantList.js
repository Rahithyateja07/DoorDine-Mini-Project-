// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function RestaurantList({ onSelectRestaurant }) {
//   const [restaurants, setRestaurants] = useState([]);
//   const API_GATEWAY_URL="http://localhost:8084"
//   const SERVER_ADDR="http://localhost:9799"

//   useEffect(() => {
//     // Replace with the actual endpoint of your backend
//     axios.get(SERVER_ADDR+'/api/restaurants')
//       .then(response => {
//         console.log(response.data)
//         setRestaurants(response.data);
//       })
//       .catch(error => console.error('Error fetching restaurants:', error));
//   }, []);

//   return (
//     <div style={styles.grid}>
//       {restaurants.map(restaurant => (
//         // <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id} style={styles.card}>
//         <Link to={`/restaurants/${restaurant.id}/${restaurant.name}/${restaurant.description}`} key={restaurant.id} style={styles.card}>
      
        

//           <img src={restaurant.imageUrl || 'https://source.unsplash.com/featured/?restaurant'} alt={restaurant.name} style={styles.image} />
//           <div style={styles.content}>
//             <h2>{restaurant.name}</h2>
//             <p>{restaurant.description}</p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }

// const styles = {
//   grid: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around'
//   },
//   card: {
//     width: '300px',
//     margin: '20px',
//     textDecoration: 'none',
//     color: 'black',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//     borderRadius: '8px',
//     overflow: 'hidden'
//   },
//   image: {
//     width: '100%',
//     height: '200px',
//     objectFit: 'cover' // Cover the figure area without stretching.
//   },
//   content: {
//     padding: '15px'
//   }
// };

// export default RestaurantList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RestaurantList({ onSelectRestaurant }) {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const API_GATEWAY_URL="http://localhost:8084"
  const SERVER_ADDR="http://localhost:9799"
  useEffect(() => {
    axios.get(SERVER_ADDR+'/api/restaurants')
      .then(response => {
        setRestaurants(response.data);
      })
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  const filteredRestaurants = searchTerm
    ? restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : restaurants;

  // Function to generate an image URL based on the restaurant name
  const generateImageUrl = (restaurantName) => {
    return `https://source.unsplash.com/featured/?${encodeURIComponent(restaurantName)}`;
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search restaurants..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />
      <div style={styles.grid}>
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map(restaurant => (
            <Link to={`/restaurants/${restaurant.id}/${restaurant.name}/${restaurant.description}`} key={restaurant.id} style={styles.card}>
              <img 
                src={restaurant.imageUrl || generateImageUrl(restaurant.name)} 
                alt={restaurant.name} 
                style={styles.image} 
              />
              <div style={styles.content}>
                <h2>{restaurant.name}</h2>
                <p>{restaurant.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <div style={styles.noResults}>No restaurants found.</div>
        )}
      </div>
    </div>
  );
}

  

const styles = {
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  card: {
    width: '300px',
    margin: '20px',
    textDecoration: 'none',
    color: 'black',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover' 
  },
  searchContainer: {
    textAlign: 'center', // Centers the search bar container
    margin: '20px 0', // Adds some space above and below the search bar
  },
  searchInput: {
    width: '50%', // Sets the search bar width to 50% of its container
    padding: '10px', // Adds some padding inside the search bar
    fontSize: '1rem', // Sets a moderate font size
    margin: '0 auto', // Centers the search bar within its container
    display: 'block', // Ensures that the search bar is a block element
  },
  noResults: {
    textAlign: 'center',
  },
  content: {
    padding: '15px'
  }
};

export default RestaurantList;