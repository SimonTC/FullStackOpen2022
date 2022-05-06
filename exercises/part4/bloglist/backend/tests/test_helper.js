const Blog = require('../models/blog')
const blogData = require('./test_data').blogs

const initialBlogs = blogData.map(data => new Blog(data))

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'My removable blog',
    author: 'Someone Forgettable',
    url: 'www.ForgetMeNot.com',
    likes: 501
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

module.exports = {
  initialBlogs, blogsInDb, nonExistingId
}