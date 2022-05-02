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