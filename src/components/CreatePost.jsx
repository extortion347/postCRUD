import React, { useState } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import '../components/css/CreatePost.css';

const CreatePost = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userId = 1;
    const newPost = { title, body, userId }; // Include userID in the new post object
    const res = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    addPost(res.data);
    setTitle('');
    setBody('');
  };
  

  // Animation function using GSAP
  const animateForm = () => {
    gsap.from('.create-post-form', { opacity: 0, y: -50, duration: 0.5, ease: 'power3.out' });
  };

  return (
    <div className="create-post" onLoad={animateForm}>
      <h2 className="create-post-title">Add Post</h2>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title:</label>
          <input className="form-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Body:</label>
          <textarea className="form-textarea" value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <button className="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
