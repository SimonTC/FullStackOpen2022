import {useState} from "react";
import PropTypes from "prop-types";

const Blog = ({blog, handleLikeIncrease, currentUser, handleBlogDeletion}) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const userMayDelete = blog.user.id === currentUser.id

  const increaseLike = () => {
    const newBlogObject = {...blog, likes: blog.likes + 1}
    handleLikeIncrease(newBlogObject)
  }

  const deleteBlog = () => {
    const deletionIsConfirmed = window.confirm(`Are you sure you want to delete "${blog.title}"?`)
    if (deletionIsConfirmed){
      handleBlogDeletion(blog)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleDetails}>{showDetails? 'hide' : 'view'}</button>
      <div style={{ display: showDetails ? '' : 'none' }}>
        {blog.url}
        <br/>
        Likes: {blog.likes}
        <button onClick={increaseLike}>Like</button>
        <br/>
        {currentUser.name}
        <br/>
        {userMayDelete &&
          <button onClick={deleteBlog}>Remove</button>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeIncrease: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  handleBlogDeletion: PropTypes.func.isRequired
}

export default Blog