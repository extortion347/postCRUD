import React, { useState } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import '../components/css/CreatePost.css';

const CreatePost = ({ addPost, userID }) => { // Destructure userID from props
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      let userId = 11;
     
      const newPost = { title, body, userId };
      const res = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
      addPost(res.data);
    }
    catch(error){
      console.log(error)
    }
   setTitle('');
    setBody('');
  };
  

  

  return (
    <div className="create-post" >
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
