import React,{useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { pink } from '@mui/material/colors';
import axios from 'axios';
export default function Register() {
    const [username, setUsername] = useState();
const [password, setPassword] = useState();
const [email,setEmail]=useState();
const [data,setData]=useState();
const [message,setMessage]=useState();
const [fields, setFields] = useState(null)
  const handleChange = (e) => setFields({ ...fields, [e.target.name]: e.target.value })

 
  async function handleSubmit(e) {
    e.preventDefault();

    console.log("Register form submitted with values:", { username, email, password });

    try {
        const response = await fetch('http://localhost:3001/api/v1/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
            }),
        });

        const responseData = await response.json();
        console.log("Register API response:", responseData);

        if (!response.ok) {
            console.log("Registration failed with message:", responseData.message);
            throw new Error(responseData.message || 'Something went wrong');
        }

        console.log("Registration successful");
        setMessage('Registration successful!');
    } catch (error) {
        console.error('Error:', error);
        setMessage(error.message);
    }
}

  
      
    
  return (
    <Box 
    
    borderColor={pink[300]}
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '45ch'  },
        
      }}
      noValidate
      autoComplete="off"
      display={'flex' }
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      marginTop={5}
    
     
    >
        <Typography variant='h4' display={'flex'} justifyContent={'center'} color={'orange'} > WELCOME TO THE BLOG </Typography>
      <TextField label="USERNAME" color="secondary" focused  marginTop={5} value={username} onChange={(e) => setUsername(e.target.value)}   />
      <TextField label="EMAIL" color="secondary" focused  type='email' value={email} onChange={ (e) => setEmail(e.target.value)}    />
      <TextField label="PASSWORD" color="secondary" focused type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <Stack  direction="row" spacing={2} variant='outlined'  >
      <Button color="success" onClick={handleSubmit} >Submit</Button>
      </Stack>
      {message && <Typography color="error">{message}</Typography>}
    </Box>
  
  );
    }
  

