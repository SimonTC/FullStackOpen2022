// noinspection PointlessArithmeticExpressionJS

const listHelper = require('../utils/list_helper')
const data = require('./test_data')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('of single blog equals the likes of that blog', () => {
    const blogs = [data.blogs[0]]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(7)
  })

  test('of multiple blogs equals the sum of likes of all the blogs', () => {
    const expectedLikes = 7 + 5 + 12 + 10 + 0 + 2 // = 36
    const result = listHelper.totalLikes(data.blogs)
    expect(result).toBe(expectedLikes)
  })
})

describe('favorite blog', () => {
  test('of empty list is undefined', () => {
    const blogs = []
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toBe(undefined)
  })

  test('of single blog equals that blog', () => {
    const blogs = [data.blogs[0]]
    const result = listHelper.favoriteBlog(blogs)
    const expectedFavorite =
      {
        title: blogs[0].title,
        author: blogs[0].author,
        likes: blogs[0].likes
      }
    expect(result).toEqual(expectedFavorite)
  })

  test('of many blogs equals the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(data.blogs)
    const expectedFavorite =
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      }
    expect(result).toEqual(expectedFavorite)
  })
})

describe('most blogs', () => {
  test('of empty list is undefined', () => {
    const blogs = []
    const result = listHelper.mostBlogs(blogs)
    expect(result).toBe(undefined)
  })

  test('of single blog equals the author of that blog', () => {
    const blogs = [data.blogs[0]]
    const result = listHelper.mostBlogs(blogs)
    const expected =
      {
        author: 'Michael Chan',
        blogs: 1
      }
    expect(result).toEqual(expected)
  })

  test('of many blogs equals the author with the most blogs', () => {
    const result = listHelper.favoriteBlog(data.blogs)
    const expected =
      {
        author: '"Robert C. Martin',
        blogs: 3
      }
    expect(result).toEqual(expected)
  })
})