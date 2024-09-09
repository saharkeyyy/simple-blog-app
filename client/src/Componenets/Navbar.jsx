import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Typography, Box } from '@mui/material';
import { AuthContext } from './utils/AuthContext';

const Navbar = () => {
  const { loginUser, setLoginUser } = useContext(AuthContext);

  const handleLogout = () => {
    setLoginUser(null);
    localStorage.removeItem("loginUser");
  };

  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
       
        // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" color="deeppink" sx={{ fontWeight: 'bold' }}>
        Rainbow Blog
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
      <Typography variant="body3" color="text.secondary" sx={{ mt: 2 }}>
              {/* Welcome, {loginUser.username} */}
            </Typography>
        {loginUser ? (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              component={Link}
              to="/create"
              sx={{
                backgroundColor: '#FF5722',
                color: '#fff',
                '&:hover': { backgroundColor: '#E64A19' },
              }}
            >
              Create Post
            </Button>
            <Button
              onClick={handleLogout}
              sx={{
                backgroundColor: '#9C27B0',
                color: '#fff',
                '&:hover': { backgroundColor: '#7B1FA2' },
                mt: 1,
              }}
            >
              Logout
            </Button>
          
          </Box>
          
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              component={Link}
              to="/login"
              sx={{
                backgroundColor: '#3F51B5',
                color: '#fff',
                '&:hover': { backgroundColor: '#303F9F' },
              }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              sx={{
                backgroundColor: '#4CAF50',
                color: '#fff',
                '&:hover': { backgroundColor: '#388E3C' },
                mt: 1,
              }}
            >
              Register
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
