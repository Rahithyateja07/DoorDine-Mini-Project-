import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function ContactUs() {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [openDialog, setOpenDialog] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value });
  };
  const navigate = useNavigate();
  // const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
  
    
    setOpenDialog(true);
    // navigate("/");
    console.log('Submitted', contact);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Redirect to "/"
    //history.push('/');
    navigate("/");
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      // background: '#f7f7f7',
      padding: '20px',
    },
    form: {
      width: '100%',
      maxWidth: '400px',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    input: {
      padding: '15px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '16px',
    },
    textarea: {
      minHeight: '150px',
      padding: '15px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '16px',
      resize: 'vertical',
    },
    button: {
      padding: '15px 20px',
      border: 'none',
      borderRadius: '4px',
      background: '#007bff',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
      alignSelf: 'start',
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Your Name"
          value={contact.name}
          onChange={handleInputChange}
          required
        />
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Your Email"
          value={contact.email}
          onChange={handleInputChange}
          required
        />
        <textarea
          style={styles.textarea}
          name="message"
          placeholder="Your Message"
          value={contact.message}
          onChange={handleInputChange}
          required
        />
        <button style={styles.button} type="submit">
          Send Message
        </button>
      </form>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle style={styles.logoText}>Feedback Submitted Successfully</DialogTitle>
        <DialogContent>
          {/* Add any additional information or confirmation message */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ContactUs;
