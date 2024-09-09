import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './utils/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: '',
    severity: 'error',
  });
  const { loginUser, setLoginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (ev) => {
    ev.preventDefault();

    console.log("Login form submitted with values:", { email, password });

    if (!email || !password) {
        console.log("Missing email or password");
        setSnack({
            open: true,
            message: 'Please fill all fields',
            severity: 'error',
        });
        return;
    }

    try {
        const response = await fetch('http://localhost:3001/api/v1/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();
        console.log("Login API response:", data);

        if (response.ok) {
            console.log("Login successful. Setting user data:", data.data);
            setLoginUser({
                ...data?.data?.user,
                token: data.data.token,
                username: data.data.username,
            });
            setSnack({
                open: true,
                message: 'Login successful',
                severity: 'success',
                
            });
            navigate('/create');
        } else {
            console.log("Login failed with message:", data.message);
            setSnack({
                open: true,
                message: 'Invalid email or password',
                severity: 'error',
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
        setSnack({
            open: true,
            message: 'Network error',
            severity: 'error',
        });
    }
};

  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '45ch' },
        }}
        noValidate
        autoComplete="off"
        display={'flex'}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        marginTop={5}
        onSubmit={handleLogin}
      >
        <Typography variant="h5" display="flex" justifyContent="center" color="orange">
          {' '}
          WELCOME BACK TO THE BLOG{' '}
        </Typography>
        <TextField
          label="USERNAME"
          color="primary"
          focused
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="EMAIL"
          color="success"
          focused
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="PASSWORD"
          color="secondary"
          focused
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button color="success" type="submit">
          Submit
        </Button>
      </Box>
      <Snackbar
        open={snack.open}
        autoHideDuration={6000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}
