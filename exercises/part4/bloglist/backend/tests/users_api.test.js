const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user in db', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('mypassword', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'other_user',
      name: 'John Doe',
      password: 'sekret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Some name',
      password: 'otherpassword'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

describe('user creation succeeds', function () {
  test('when username and password has exactly the correct number of symbols', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'abc',
      name: 'John Doe',
      password: '123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('user creation fails', function () {

  const assertCreationOfUserFails = async (newUser) => {
    const usersAtStart = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username or password is invalid')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }

  test('when username has less than 3 characters', async () => {
    const newUser = {
      username: 'ab',
      name: 'Some name',
      password: 'otherpassword'
    }

    await assertCreationOfUserFails(newUser)
  })

  test('when password has less than 3 characters', async () => {
    const newUser = {
      username: 'john',
      name: 'Some name',
      password: '12'
    }

    await assertCreationOfUserFails(newUser)
  })

  test('when password is not given', async () => {
    const newUser = {
      username: 'john',
      name: 'Some name',
    }

    await assertCreationOfUserFails(newUser)
  })

  test('when username is not given', async () => {
    const newUser = {
      name: 'Some name',
      password: '12'
    }

    await assertCreationOfUserFails(newUser)
  })
})