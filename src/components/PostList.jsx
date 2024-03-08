import React, { useState } from 'react';
import DeletePost from './DeletePost';
import EditPost from './EditPost';
import './css/PostList.css';

const generateRandomColor = () => {
  const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D'];
  const availableColors = colors.filter(color => color !== '#ffc107' && color !== '#dc3545'); // Exclude yellow and red colors
  return availableColors[Math.floor(Math.random() * availableColors.length)];
};

const PostList = ({ posts, loading, deletePost, updatePost }) => {
  const [editingPostId, setEditingPostId] = useState(null);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const handleEditClick = (postId) => {
    setEditingPostId(postId);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
  };

  return (
    <ul className="list-group">
      {posts.map(post => (
        <li key={post.id} className="list-group-item" style={{ backgroundColor: generateRandomColor() }}>
          {editingPostId === post.id ? (
            <EditPost post={post} updatePost={updatePost} onCancel={handleCancelEdit} />
          ) : (
            <div>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
              <div className="btn-container">
                <button
                  className="edit-btn"
                 
                  onClick={() => handleEditClick(post.id)}
                >
                  Edit
                </button>
                <DeletePost
                  className="delete-btn "
                  id={post.id}
                  deletePost={deletePost}
                 
                />
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default PostList;
