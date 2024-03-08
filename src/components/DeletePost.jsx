import React from 'react';
import axios from 'axios';
import './css/DeletePost.css'; // Import the CSS file for styling

const DeletePost = ({ id, deletePost }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      deletePost(id);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <button className="delete-btn" onClick={handleDelete}>
      <span>Delete</span>
    </button>
  );
};

export default DeletePost;
