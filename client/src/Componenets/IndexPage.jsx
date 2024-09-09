import React,{useState,useEffect}from 'react'
import Post from './Post';

function IndexPage() {
    const [posts,setPosts] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/v1/post');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return response.json();
        } catch (error) {
          console.error('Error fetching dataxxx');
          throw error; // Re-throw the error to be caught by the .then
        }
      };
    
      fetchData()
        .then(posts => {
          setPosts(posts);
        })
        .catch(error => {
          // Handle error from fetchData
        });
    }, []);
  return (
    <div>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))}
    </div>
  )
}

export default IndexPage
