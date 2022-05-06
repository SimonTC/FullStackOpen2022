const Blog = require('../models/blog')
const blogData = require('./test_data').blogs

const initialBlogs = blogData.map(data => new Blog(data))

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}