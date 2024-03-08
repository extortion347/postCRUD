import React, { useState, useEffect } from 'react';
import axios from 'axios';

import EditPost from './components/EditPost';
import DeletePost from './components/DeletePost';
import Pagination from './components/Pagination';
import CreatePost from './components/CreatePost';

import './App.css';
function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // Number of posts per page

  // Calculate indexes of the first and last posts on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };


  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = (newPost) => {
    posts.push(newPost);
    setPosts([...posts]);
  };

  const updatePost = (updatedPost) => {
    const existingPostIndex = posts.findIndex(post => post.id === updatedPost.id);

    if (existingPostIndex !== -1) {
      const updatedPosts = [...posts];
      updatedPosts[existingPostIndex] = updatedPost;
      setPosts(updatedPosts);
    } else {
      console.log("Locally created post updated:", updatedPost);
    }

    setEditingPostId(null);
  };

  const deletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
  };

  const handleEditClick = (postId) => {
    setEditingPostId(postId);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="App">
      <h1>Posts</h1>
      <CreatePost addPost={addPost} />

      {currentPosts.map(post => (
        <div key={post.id} className="post">
          {editingPostId === post.id ? (
            <EditPost post={post} updatePost={updatePost} onCancel={handleCancelEdit} />
          ) : (
            <div>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <div className="btn-container">
                <button onClick={() => handleEditClick(post.id)}>Edit</button>
                <DeletePost id={post.id} deletePost={deletePost} />
              </div>
            </div>
          )}
        </div>
      ))}

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={goToPage}
        nextPage={nextPage}
        prevPage={prevPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
