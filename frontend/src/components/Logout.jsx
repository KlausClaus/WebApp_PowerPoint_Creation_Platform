import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Box } from '@mui/material';

const Logout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/signup') {
    return null;
  }

  const handleLogout = async () => {
    const token = localStorage.getItem('token'); // Retrieve the stored token
    try {
      await fetch('http://localhost:5005/admin/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    }
    localStorage.removeItem('token'); // Remove the token
    navigate('/');
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  return (
    <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
      { localStorage.getItem('token') === null
        ? <Button variant="contained" color="primary" onClick={handleRegister}>
            Register
          </Button>
        : <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
      }
    </Box>
  );
}

export default Logout;
