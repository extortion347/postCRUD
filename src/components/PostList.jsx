import React, { useState } from 'react';
import DeletePost from './DeletePost';
import EditPost from './EditPost';
import './css/PostList.css';

const generateRandomColor = () => {
  const lightColors = ['#E0FFFF', '#F0FFF0', '#FAFAD2', '#FFE4E1', '#FFDAB9', '#F0FFFF', '#F5F5DC', '#FFEBCD', '#FFFACD', '#F0F8FF'];
  return lightColors[Math.floor(Math.random() * lightColors.length)];
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
                <button className="edit-btn" onClick={() => handleEditClick(post.id)}>Edit</button>
                <DeletePost id={post.id} deletePost={deletePost} />
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default PostList;
