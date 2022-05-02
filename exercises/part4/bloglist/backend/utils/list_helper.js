const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce( (sum, blog) => sum + blog.likes, 0 )
}

const favoriteBlog = (blogs) => {
  let favoriteBlog
  let maxLikes = -1

  for (const blog of blogs) {
    if (blog.likes > maxLikes){
      maxLikes = blog.likes
      favoriteBlog = blog
    }
  }

  if (favoriteBlog){
    return {
      title: favoriteBlog.title,
      author: favoriteBlog.author,
      likes: favoriteBlog.likes
    }
  }

  return undefined
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}