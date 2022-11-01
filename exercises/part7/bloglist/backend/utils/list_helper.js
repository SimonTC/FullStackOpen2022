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

const getBlogsByAuthor = (blogs) => Object.entries(_.groupBy(blogs, blog => blog.author))

const mostBlogs = (blogs) => {
  if (blogs.length === 0){
    return undefined
  }

  const [mostProductiveAuthor, allBlogs] = _(getBlogsByAuthor(blogs)).maxBy(([, entries]) => entries.length)

  return {
    author: mostProductiveAuthor,
    blogs: allBlogs.length
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0){
    return undefined
  }

  const [author, likes] = _(getBlogsByAuthor(blogs))
    .map(([author, entries]) => [author,  _(entries).sumBy(blog => blog.likes)] )
    .maxBy(([, likes]) => likes)

  return {
    author: author,
    likes: likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}