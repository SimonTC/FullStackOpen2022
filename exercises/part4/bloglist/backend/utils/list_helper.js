const _ = require('lodash')

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0){
    return undefined
  }

  const blogsByAuthor = _.groupBy(blogs, blog => blog.author)
  const [mostProductiveAuthor, allBlogs] = _.maxBy(Object.entries(blogsByAuthor), ([, entries]) => entries.length)

  return {
    author: mostProductiveAuthor,
    blogs: allBlogs.length
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}