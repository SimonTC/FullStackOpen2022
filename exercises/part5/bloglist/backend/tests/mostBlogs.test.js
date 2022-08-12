// noinspection PointlessArithmeticExpressionJS

const listHelper = require('../utils/list_helper')
const data = require('./test_data')

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
    const result = listHelper.mostBlogs(data.blogs)
    const expected =
      {
        author: 'Robert C. Martin',
        blogs: 3
      }
    expect(result).toEqual(expected)
  })
})