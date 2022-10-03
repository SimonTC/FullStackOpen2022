import Blog from "./Blog";
import {render} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'

describe('<Blog/>', function () {
  test('only renders title and author by default', async () => {
    const currentUser = {id:'me'}
    const blog = {
        title: "My blog title",
        url: "www.donotshow.com",
        likes: 500,
        author: "The amazing Maurice",
        user:currentUser
      }

    const {container} = render(<Blog blog={blog} currentUser={currentUser} handleBlogDeletion={jest.fn()} handleLikeIncrease={jest.fn()} />)

    expect(container.querySelector('#title-and-author')).toBeVisible()

    expect(container.querySelector('#details')).not.toBeVisible()
    expect(container.querySelector('#likes')).not.toBeVisible()
    expect(container.querySelector('#url')).not.toBeVisible()
    expect(container.querySelector('#added-by')).not.toBeVisible()
  })
});