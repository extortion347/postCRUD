import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import Pagination from './components/Pagination';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // Number of posts per page

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const addPost = (post) => {
    setPosts([post, ...posts]);
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const updatePost = (updatedPost) => {

    setPosts(posts.map(post => (post.id === updatedPost.id ? updatedPost : post)));
  };


  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1 className="text-primary mb-3">Posts</h1>
      <CreatePost addPost={addPost} />
      <PostList posts={currentPosts} loading={loading} deletePost={deletePost} updatePost={updatePost} />

      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
    </div>
  );
}

export default App;
