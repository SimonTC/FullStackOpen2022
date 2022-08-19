import {useState} from "react";

const Blog = ({blog, handleLikeIncrease}) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const increaseLike = () => {
    const newBlogObject = {...blog, likes: blog.likes + 1}
    handleLikeIncrease(newBlogObject)
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
      {blog.title}
      <button onClick={toggleDetails}>{showDetails? 'hide' : 'view'}</button>
      <div style={{ display: showDetails ? '' : 'none' }}>
        {blog.url}
        <br/>
        Likes: {blog.likes}
        <button onClick={increaseLike}>Like</button>
        <br/>
        {blog.author}
      </div>
    </div>
  )
}

export default Blog