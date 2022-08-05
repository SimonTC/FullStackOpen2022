const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

const BASE_URL = '/api/blogs'

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', function () {
  test('blogs are returned as json', async () => {
    await api
      .get(BASE_URL)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get(BASE_URL)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the unique identifier property of a blog is called id', async () => {
    const response = await api.get(BASE_URL)

    const blog = response.body[0]
    expect(blog).not.toHaveProperty('_id')
    expect(blog).toHaveProperty('id')
  })
})

describe('adding a new blog', function () {
  test('is successful when the data is valid', async () => {
    const newBlogPost = {
      title: 'My completely new blog post',
      author: 'the best there is',
      url: 'www.awesome.com',
      likes: 456
    }

    await api
      .post(BASE_URL)
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAdding = await helper.blogsInDb()
    expect(blogsAfterAdding).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAfterAdding).toContainEqual(
      expect.objectContaining(newBlogPost)
    )
  })

  test('automatically associates a user with the blog post', async () => {
    const newBlogPost = {
      title: 'My completely new blog post',
      author: 'the best there is',
      url: 'www.awesome.com',
      likes: 456
    }

    const creationResponse = await api
      .post(BASE_URL)
      .send(newBlogPost)

    const createdBlogPost = creationResponse.body

    expect(createdBlogPost).toHaveProperty('user')
    expect(createdBlogPost.user).toBeTruthy()
  })

  test('if likes are missing on a new blog post then the value is set to zero', async () => {
    const blogPostWithoutLikes = {
      title: 'My blog post without likes',
      author: 'the best there is',
      url: 'www.awesome.com',
    }

    const expectedBlogPost = {
      title: blogPostWithoutLikes.title,
      author: blogPostWithoutLikes.author,
      url: blogPostWithoutLikes.url,
      likes: 0
    }

    await api
      .post(BASE_URL)
      .send(blogPostWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAdding = await helper.blogsInDb()
    expect(blogsAfterAdding).toContainEqual(
      expect.objectContaining(expectedBlogPost)
    )
  })

  test('returns status code 400 if the title is missing ', async () => {
    const blogPostWithoutTitle = {
      author: 'the best there is',
      url: 'www.awesome.com',
      likes: 456
    }

    await api
      .post(BASE_URL)
      .send(blogPostWithoutTitle)
      .expect(400)
  })

  test('returns status code 400 if the url is missing', async () => {
    const blogPostWithoutUrl = {
      title: 'Look at this great title',
      author: 'the best there is',
      likes: 456
    }

    await api
      .post(BASE_URL)
      .send(blogPostWithoutUrl)
      .expect(400)
  })
})

describe('deleting a blog', function () {
  test('succeeds with a status of 204 when the id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).not.toContainEqual(
      expect.objectContaining(blogToDelete)
    )
  })

  test('returns 204 if no blog with that id exist', async () => {
    const idOfNotExistingBlog = await helper.nonExistingId()

    await api
      .delete(`/api/blogs/${idOfNotExistingBlog}`)
      .expect(204)
  })

  test('returns 400 if the id is invalid', async () => {
    const invalidId = '465lkt'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('updating a blog', function () {
  test('is successful when data is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const idOfBlogToUpdate = blogsAtStart[0].id

    const updatedBlog = {
      title: 'My completely new blog post',
      author: 'the best there is',
      url: 'www.awesome.com',
      likes: 999
    }

    await api
      .put(`/api/blogs/${idOfBlogToUpdate}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toContainEqual(
      expect.objectContaining(updatedBlog)
    )
  })

  test('works when only a single field is updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const idOfBlogToUpdate = blogToUpdate.id

    const newAuthor = 'the best there is'
    const updatedBlog = {
      author: newAuthor,
    }

    const expectedBlog = {
      title: blogToUpdate.title,
      author: newAuthor,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes
    }

    await api
      .put(`/api/blogs/${idOfBlogToUpdate}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAfter = await helper.blogsInDb()

    expect(blogsAfter).toContainEqual(
      expect.objectContaining(expectedBlog)
    )
  })

  test('returns 200 if given id does not exist', async () => {
    const updatedBlog = {
      title: 'I will be gone with the wind soon',
    }
    const idOfNonExistingBlog = await helper.nonExistingId()
    await api
      .put(`/api/blogs/${idOfNonExistingBlog}`)
      .send(updatedBlog)
      .expect(404)
  })

  test('returns 400 if id is invalid', async () => {
    const updatedBlog = new Blog({
      title: 'I will be gone with the wind soon',
    })
    const invalidId = 'bibbob2'
    await api
      .put(`/api/blogs/${invalidId}`)
      .send(updatedBlog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})