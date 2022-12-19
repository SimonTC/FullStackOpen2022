import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addLikeFor } from '../reducers/blogReducer';

const Blog = ({ blog, currentUser, handleBlogDeletion }) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const userMayDelete = blog.user.id === currentUser.id;

  const increaseLike = () => {
    dispatch(addLikeFor(blog));
  };

  const deleteBlog = () => {
    const deletionIsConfirmed = window.confirm(
      `Are you sure you want to delete "${blog.title}"?`
    );
    if (deletionIsConfirmed) {
      handleBlogDeletion(blog);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} data-cy="blog">
      <span id="title-and-author">
        {blog.title} {blog.author}{' '}
      </span>
      <button id="toggle-details-btn" onClick={toggleDetails}>
        {showDetails ? 'hide' : 'view'}
      </button>
      <div id="details" style={{ display: showDetails ? '' : 'none' }}>
        <p id="url">URL: {blog.url}</p>
        <p>
          <span id="likes">Likes: {blog.likes} </span>
          <button onClick={increaseLike}>Like</button>
        </p>
        <p id="added-by">Added by: {currentUser.name}</p>
        {userMayDelete && <button onClick={deleteBlog}>Remove</button>}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  handleBlogDeletion: PropTypes.func.isRequired,
};

export default Blog;
