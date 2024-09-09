import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Box, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

// Expanded theme list with emojis and unique styles
const themes = {
  halloween: {
    backgroundColor: '#2E2E2E',
    color: '#FF6F61',
    borderColor: '#FF6F61',
    emoji: '🎃',
    titleStyle: { color: '#FF9800' },
    summaryStyle: { color: '#FFC107' },
  },
  easter: {
    backgroundColor: '#FFF8E1',
    color: '#FF4081',
    borderColor: '#FFC107',
    emoji: '🐰',
    titleStyle: { color: '#FF4081' },
    summaryStyle: { color: '#FF80AB' },
  }, 
  nowruz: {
    backgroundColor: '#A5D6A7',
    color: '#388E3C',
    emoji: '🌸🎊',
  },
  yalda: {
    backgroundColor: '#B71C1C',
    color: '#FFF',
    emoji: '🍉🌙',
  },
  christmas: {
    backgroundColor: '#4CAF50',
    color: '#FFF',
    borderColor: '#D32F2F',
    emoji: '🎄',
    titleStyle: { color: '#FFF' },
    summaryStyle: { color: '#FFCDD2' },
  },
  summer: {
    backgroundColor: '#FFEB3B',
    color: '#2D7D37',
    borderColor: '#2196F3',
    emoji: '🌞',
    titleStyle: { color: '#FF5722' },
    summaryStyle: { color: '#FF9800' },
  },
  valentine: {
    backgroundColor: '#FCE4EC',
    color: '#F50057',
    borderColor: '#D81B60',
    emoji: '❤️',
    titleStyle: { color: '#F50057' },
    summaryStyle: { color: '#F48FB1' },
  },
  newyear: {
    backgroundColor: '#3F51B5',
    color: '#FFF',
    borderColor: '#FFEB3B',
    emoji: '🎉',
    titleStyle: { color: '#FFEB3B' },
    summaryStyle: { color: '#FFCDD2' },
  },
  thanksgiving: {
    backgroundColor: '#FF7043',
    color: '#FFF',
    borderColor: '#8D6E63',
    emoji: '🦃',
    titleStyle: { color: '#D84315' },
    summaryStyle: { color: '#FFCCBC' },
  },
  spring: {
    backgroundColor: '#C8E6C9',
    color: '#388E3C',
    borderColor: '#4CAF50',
    emoji: '🌸',
    titleStyle: { color: '#388E3C' },
    summaryStyle: { color: '#81C784' },
  },
};

// Function to get a random theme
const getRandomTheme = () => {
  const themeKeys = Object.keys(themes);
  const randomIndex = Math.floor(Math.random() * themeKeys.length);
  return themes[themeKeys[randomIndex]];
};

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/post', {
          headers: {
            'Cache-Control': 'no-cache', // Disable caching
          },
        });
        setPosts(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <Typography variant="h6" sx={{ textAlign: 'center', p: 4 }}>Loading...</Typography>;

  if (error) return <Typography variant="h6" sx={{ textAlign: 'center', p: 4 }}>{error}</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>Blog Posts</Typography>
      <Grid container spacing={3}>
        {posts.length > 0 ? (
          posts.map((post) => {
            const themeStyle = getRandomTheme();
            return (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <Card
                  sx={{
                    backgroundColor: themeStyle.backgroundColor,
                    color: themeStyle.color,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': { transform: 'scale(1.05)' },
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    border: `2px solid ${themeStyle.borderColor}`,
                    borderRadius: '10px',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`http://localhost:3001${post.image}`} // Dynamically load the image
                    alt={post.title}
                    sx={{
                      height: 240,
                      width: '100%',
                      objectFit: 'fill',
                      borderTopLeftRadius: '10px',
                      borderTopRightRadius: '10px',
                    }}
                  />
                  <CardContent>
                    <Typography variant="h5" sx={{ ...themeStyle.titleStyle, mb: 1 }}>
                      {themeStyle.emoji} {post.title}
                    </Typography>
                    <Typography variant="body2" sx={{ ...themeStyle.summaryStyle, mb: 2 }}>
                      {post.summary}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: themeStyle.color }}>
                    By {post.author} {/* Use username or fallback */}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ mt: 2, backgroundColor: themeStyle.borderColor, color: themeStyle.color }}
                      component={Link}
                      to={`/post/${post._id}`} // Link to the post details page
                    >
                      More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            No posts available
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Post;
