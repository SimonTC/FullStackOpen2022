const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (blogToDelete && blogToDelete.user.toString() !== request.user.id.toString()){
    return response.status(403).json({ error: 'wrong user' })
  }

  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, url, author, likes } = request.body

  const updatedBlog =
    await Blog.findByIdAndUpdate(
      request.params.id,
      { title: title, url: url, author: author, likes: likes },
      { new: true, runValidators: true, context: 'query' }
    )

  if (!updatedBlog){
    // If there is no body it means that no item with the given id exists
    response.status(404).end()
  } else {
    response.json(updatedBlog)
  }

})

module.exports = blogsRouter