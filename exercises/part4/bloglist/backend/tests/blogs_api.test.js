const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

const BASE_URL = '/api/blogs'

beforeEach(async () => {
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

afterAll(() => {
  mongoose.connection.close()
})