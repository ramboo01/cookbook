import React from 'react';


import { useNavigate } from 'react-router-dom';

const Firlogin = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(to right, rgb(162, 71, 141), #2575fc)',
      fontFamily: 'sans-serif',
    },
    heading: {
      color: 'white',
      marginBottom: '20px',
      fontSize: '24px',
    },
    button: {
      padding: '10px 20px',
      margin: '10px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#1e90ff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease-in-out',
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>WELCOME TO MY NEW RECIPE WEBSITE</h3>

      <button
        style={styles.button}
        onClick={() => {
          console.log('Login clicked');
          navigate('/f');
        }}
      >
        Login
      </button>

      <button
        style={styles.button}
        onClick={() => {
          console.log('Register clicked');
          navigate('/register');
        }}
      >
        Register
      </button>
    </div>
  );
};

export default Firlogin;
