import React from 'react';

const styles = {
  aboutUsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7f7f7',
    padding: '40px',
  },
  aboutUsContent: {
    maxWidth: '800px',
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    marginBottom: '40px',
  },
  aboutUsHeading: {
    fontSize: '48px',
    marginBottom: '20px',
    color: '#333333',
    textTransform: 'uppercase',
  },
  aboutUsIntro: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#800080',
    marginBottom: '20px',
  },
  aboutUsDescription: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#666666',
    marginBottom: '20px',
  },
  restaurantDetails: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  restaurantImage: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    marginRight: '40px',
  },
  details: {
    textAlign: 'left',
  },
  restaurantName: {
    fontSize: '28px',
    color: '#333333',
    marginBottom: '10px',
  },
  detailItem: {
    fontSize: '18px',
    color: '#666666',
    marginBottom: '10px',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  card: {
    flex: '1',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '24px',
    color: '#333333',
  },
  cardDescription: {
    fontSize: '16px',
    color: '#666666',
  },
  orangeHighlight: {
    color: '#ff4500',
    fontWeight: 'bold',
  },
  purpleText: {
    color: '#800080',
    fontWeight: 'bold',
  },
};

const Card = ({ title, description }) => (
  <div style={styles.card}>
    <h2 style={styles.cardTitle}>{title}</h2>
    <p style={styles.cardDescription}>{description}</p>
  </div>
);

function AboutUs() {
  return (
    <div style={styles.aboutUsContainer}>
      <div style={styles.aboutUsContent}>
        <h1 style={styles.aboutUsHeading}>About Us</h1>
        <p style={styles.aboutUsIntro}>
          <span style={styles.purpleText}>Welcome to DoorDine!</span>
        </p>
        <p style={styles.aboutUsDescription}>
          <span style={styles.orangeHighlight}>DoorDine</span> is a leading platform connecting food
          lovers with their favorite restaurants. Discover a variety of cuisines and dishes through
          our extensive restaurant network. Whether you're craving a quick bite or planning a
          special meal, DoorDine is your go-to destination for food ordering and delivery.
        </p>
        <p style={styles.aboutUsDescription}>
          Our mission is to simplify the way people order food online while supporting local
          businesses and ensuring exceptional dining experiences.
        </p>
      </div>

      <div style={styles.restaurantDetails}>
        <img
          src="https://cdn.pixabay.com/photo/2016/05/26/14/11/chef-1417239_1280.png"
          alt=""
          style={styles.restaurantImage}
        />
        <div style={styles.details}>
          <h2 style={styles.restaurantName}>DoorDine</h2>
          <p style={styles.detailItem}><strong>Email:</strong> doordine@gmail.com</p>
          <p style={styles.detailItem}><strong>Timings:</strong> Monday-Saturday, 11:00 AM - 9:00 PM</p>
        </div>
      </div>

      <div style={styles.cardContainer}>
        <Card
          title="Easy Ordering"
          description="Order food hassle-free from a diverse range of restaurants."
        />
        <Card
          title="Fast Delivery"
          description="Enjoy quick and reliable food delivery right to your doorstep."
        />
        <Card
          title="Local Favorites"
          description="Discover and support your local eateries and favorite cuisines."
        />
      </div>
    </div>
  );
}

export default AboutUs;
