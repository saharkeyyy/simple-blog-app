import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Box, CircularProgress } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { Link } from 'react-router-dom';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    author: '',
    file: null
  });
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });

    // Update image preview
    if (e.target.files[0]) {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setImageURL(fileURL);
    }
  };

  const handleContentChange = (value) => {
    setFormData({
      ...formData,
      content: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newPostData = new FormData();
    newPostData.append('title', formData.title);
    newPostData.append('summary', formData.summary);
    newPostData.append('content', formData.content);
    newPostData.append('author', formData.author);
    if (formData.file) {
      newPostData.append('file', formData.file);
    }

    try {
      const response = await axios.post('http://localhost:3001/api/v1/post', newPostData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Post created successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error creating post', error);
      alert('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        maxWidth: '800px',
        margin: '0 auto',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        '@media (max-width: 600px)': {
          p: 2,
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          textAlign: 'center',
          color: '#333',
          fontWeight: 'bold',
          fontSize: { xs: '1.8rem', sm: '2.2rem' },
        }}
      >
        Create a New Post
      </Typography>
      
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        sx={{ mb: 2 }}
        required
      />
      
      <TextField
        fullWidth
        label="Summary"
        name="summary"
        value={formData.summary}
        onChange={handleChange}
        sx={{ mb: 2 }}
        required
      />
      
      <Typography
        sx={{
          mb: 1,
          fontWeight: 'bold',
          color: '#555',
        }}
      >
        Content
      </Typography>
      <ReactQuill
        theme="snow"
        value={formData.content}
        onChange={handleContentChange}
        style={{ height: '200px', marginBottom: '20px' }}
      />
      
      <TextField
        fullWidth
        label="Author"
        name="author"
        value={formData.author}
        onChange={handleChange}
        sx={{ mb: 3,mt:4 }}
        required
      />
      
      <Button
        variant="contained"
        component="label"
        sx={{ mb: 2, backgroundColor: 'lightgreen', color: '#fff', '&:hover': { backgroundColor: '#1565C0' } }}
      >
        Upload Image
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Button>

      {imageURL && (
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Uploaded Image:</Typography>
          <img src={imageURL} alt="Uploaded" style={{ maxWidth: '100%', borderRadius: '8px' }} />
        </Box>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          fontWeight: 'bold',
          backgroundColor: 'deeppink',
          '&:hover': { backgroundColor: 'pink' },
        }}
      >
        {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Create Post'}
      </Button>
      
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#1976D2' }}>
          <Button variant="text" sx={{ color: '#1976D2' }}>See posts</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default CreatePost;
