const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

const BASE_URL = '/api/blogs'

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(note => new Blog(note))
  const creationPromises = blogObjects.map(blog => blog.save())
  await Promise.all(creationPromises)
})

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

afterAll(() => {
  mongoose.connection.close()
})