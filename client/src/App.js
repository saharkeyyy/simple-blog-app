import React,{useState,useEffect} from 'react';
import './App.css';
import { Route, Router, Routes,Navigate } from 'react-router-dom';
import { useSelector} from 'react-redux';

import Login from './Componenets/Login';
import Register from './Componenets/Register';
import Post from './Componenets/Post';
import Navbar from './Componenets/Navbar';
import { UserContext, UserContextProvider } from './Componenets/userContext';
import CreatePost from './Componenets/CreatePost';
import PostPage from './Componenets/PostPage';
import EditPost from './Componenets/EditPost';
import IndexPage from './Componenets/IndexPage';
import { AuthContext } from './Componenets/utils/AuthContext';
import Home from './Componenets/Home';
import PostDetails from './Componenets/PostDetails';
function App() {
  const [loginUser, setLoginUser] = useState();
  let data = localStorage.getItem("loginUser");
  useEffect(() => {
    data && setLoginUser(JSON.parse(data));
    // console.log(data.data);
  }, []);
  
  return (
     
    <div className="App">
     
      <AuthContext.Provider value={{ loginUser, setLoginUser }}>
       
    
     
    <Navbar/>
    <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/login' element={<Login />} />
  <Route path='/register' element={<Register />} />
  <Route path='/post' element={<Post />} />
  <Route path="/create" element={<CreatePost />} /> 
  {/* <Route path="/post/:id" element={<PostPage />} /> */}
  <Route path="/edit/:id" element={<EditPost />} />
  <Route path="/post/:id" element={<PostDetails/>} />
  {/* <Route index element={<IndexPage />} /> */}
</Routes>

     
        </AuthContext.Provider>
    </div>
  );
}

export default App;
