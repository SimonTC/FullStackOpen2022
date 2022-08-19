import {useState} from "react";

const Blog = ({blog}) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails)
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
        <button>Like</button>
        <br/>
        {blog.author}
      </div>
    </div>
  )
}

export default Blog