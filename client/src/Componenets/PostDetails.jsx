import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

// Optional theme object to match the themes in your cards
const themes = {
  halloween: {
    backgroundColor: '#2E2E2E',
    color: '#FF6F61',
    emoji: '🎃',
  },
  easter: {
    backgroundColor: '#FFF8E1',
    color: '#FF4081',
    emoji: '🐰',
  },
  christmas: {
    backgroundColor: '#4CAF50',
    color: '#FFF',
    emoji: '🎄',
  },
  summer: {
    backgroundColor: '#FFEB3B',
    color: '#2D7D37',
    emoji: '🌞',
  },
  valentine: {
    backgroundColor: '#FCE4EC',
    color: '#F50057',
    emoji: '❤️',
  },
  newyear: {
    backgroundColor: '#3F51B5',
    color: '#FFF',
    emoji: '🎉',
  },
  thanksgiving: {
    backgroundColor: '#FF7043',
    color: '#FFF',
    emoji: '🦃',
  },
  spring: {
    backgroundColor: '#C8E6C9',
    color: '#388E3C',
    emoji: '🌸',
  }, nowruz: {
    backgroundColor: '#A5D6A7',
    color: '#388E3C',
    emoji: '🌸🎊',
  },
  yalda: {
    backgroundColor: '#1E88E5',
    color: '#FFF',
    emoji: '🍉🌙',
  },
};

// Function to get a random theme (reuse this if you want thematic style consistency)
const getRandomTheme = () => {
  const themeKeys = Object.keys(themes);
  const randomIndex = Math.floor(Math.random() * themeKeys.length);
  return themes[themeKeys[randomIndex]];
};

const PostDetails = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const themeStyle = getRandomTheme(); // Get a random theme

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/post/${id}`); // Correct route
        setPost(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load the post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <Typography variant="h6" sx={{ textAlign: 'center', p: 4 }}>Loading...</Typography>;

  if (error) return <Typography variant="h6" sx={{ textAlign: 'center', p: 4 }}>{error}</Typography>;

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center', // Centering the text
        backgroundColor: themeStyle.backgroundColor, // Theme background
        color: themeStyle.color, // Theme color
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Card-like shadow effect
      }}
    >
      {post && (
        <>
          <Typography
            variant="h3"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }, // Responsive font size
              textAlign: 'center', // Center the title
            }}
          >
            {themeStyle.emoji} {post.title}
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              fontSize: { xs: '1rem', sm: '1.25rem' }, // Responsive font size
              lineHeight: '1.6',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            {post.content}
          </Typography>

          <Box
            component="img"
            src={`http://localhost:3001${post.image}`}
            alt={post.title}
            sx={{
              width: '100%',
              maxWidth: '900px', // Max width for large screens
              height: 'auto',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Add a shadow effect for the image
              margin: '0 auto',
            }}
          />
          
          <Typography
            variant="h6"
            sx={{
              mt: 4,
              fontWeight: 'bold',
              fontSize: { xs: '1.1rem', sm: '1.5rem' }, // Responsive font size
              color: themeStyle.color,
            }}
          >
            Author: {post.author}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default PostDetails;
