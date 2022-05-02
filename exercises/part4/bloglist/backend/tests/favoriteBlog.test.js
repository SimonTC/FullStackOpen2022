// noinspection PointlessArithmeticExpressionJS

const listHelper = require('../utils/list_helper')
const data = require('./test_data')

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