import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Box } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams(); // Get post ID from the URL
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    file: null,
    image: '', // Holds the current image path
  });

  useEffect(() => {
    // Fetch the existing post data
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/post/${id}`);
        const { title, summary, content, image } = response.data.data;
        setFormData({ title, summary, content, image });
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleContentChange = (value) => {
    setFormData({
      ...formData,
      content: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPostData = new FormData();
    updatedPostData.append('title', formData.title);
    updatedPostData.append('summary', formData.summary);
    updatedPostData.append('content', formData.content);
    updatedPostData.append('image', formData.image); // Send the existing image if no new one is uploaded
    if (formData.file) {
      updatedPostData.append('file', formData.file);
    }

    try {
      const response = await axios.put(`http://localhost:3001/api/v1/post/${id}`, updatedPostData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Post updated successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error updating post', error);
      alert('Failed to update post');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Edit Post</Typography>

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

      <Typography sx={{ mb: 1 }}>Content</Typography>
      <ReactQuill
        theme="snow"
        value={formData.content}
        onChange={handleContentChange}
        style={{ height: '200px', marginBottom: '20px' }}
      />

      <Button
        variant="contained"
        component="label"
        sx={{ mb: 2 }}
      >
        Upload New Image
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Button>

      <Button type="submit" variant="contained" color="primary">
        Update Post
      </Button>
    </Box>
  );
};

export default EditPost;
