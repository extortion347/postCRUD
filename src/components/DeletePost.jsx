import React from 'react';
import axios from 'axios';

const DeletePost = ({ id, deletePost }) => {
  const handleDelete = async () => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    deletePost(id);
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeletePost;
