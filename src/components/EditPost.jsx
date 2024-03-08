import React, { useState } from 'react';
import axios from 'axios';
import '../components/css/EditPost.css';

const EditPost = ({ post, updatePost }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = { ...post, title, body };
      const res = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, updatedPost);
      updatePost(res.data);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleCancel = () => {
    // Reset form fields to initial state
    setTitle(post.title);
    setBody(post.body);
  };

  return (
    <div className="edit-post-container">
      <h2 className="edit-post-heading">Edit Post</h2>
      <form onSubmit={handleSubmit} className="edit-post-form">
        <div className="form-group">
          <label className="form-label">Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Body:</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} className="form-textarea" />
        </div>
        <div className="btn-group">
          <button type="submit" className="submit-btn">Update</button>
          <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
