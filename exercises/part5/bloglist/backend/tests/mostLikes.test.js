// noinspection PointlessArithmeticExpressionJS

const listHelper = require('../utils/list_helper')
const data = require('./test_data')

describe('most likes', () => {
  test('of empty list is undefined', () => {
    const blogs = []
    const result = listHelper.mostLikes(blogs)
    expect(result).toBe(undefined)
  })

  test('of single blog equals the author of that blog', () => {
    const blogs = [data.blogs[0]]
    const result = listHelper.mostLikes(blogs)
    const expected =
      {
        author: 'Michael Chan',
        likes: 7
      }
    expect(result).toEqual(expected)
  })

  test('of many blogs equals the author with the most likes', () => {
    const result = listHelper.mostLikes(data.blogs)
    const expected =
      {
        author: 'Edsger W. Dijkstra',
        likes: 17
      }
    expect(result).toEqual(expected)
  })
})