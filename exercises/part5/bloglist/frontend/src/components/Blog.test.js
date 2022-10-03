import Blog from "./Blog";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import userEvent from "@testing-library/user-event";

describe('<Blog/>', function () {
  const currentUser = {id:'me'}
  const blog = {
    title: "My blog title",
    url: "www.donotshow.com",
    likes: 500,
    author: "The amazing Maurice",
    user:currentUser
  }
  
  test('only renders title and author by default', async () => {
    const {container} = render(<Blog blog={blog} currentUser={currentUser} handleBlogDeletion={jest.fn()} handleLikeIncrease={jest.fn()} />)

    expect(container.querySelector('#title-and-author')).toBeVisible()

    expect(container.querySelector('#details')).not.toBeVisible()
    expect(container.querySelector('#likes')).not.toBeVisible()
    expect(container.querySelector('#url')).not.toBeVisible()
    expect(container.querySelector('#added-by')).not.toBeVisible()
  })
  
  test('renders details when show details button is clicked', async () => {
    const {container} = render(<Blog blog={blog} currentUser={currentUser} handleBlogDeletion={jest.fn()} handleLikeIncrease={jest.fn()} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(container.querySelector('#details')).toBeVisible()
    expect(container.querySelector('#likes')).toBeVisible()
    expect(container.querySelector('#url')).toBeVisible()
    expect(container.querySelector('#added-by')).toBeVisible()
  })
  
  test('like event handler is wired correctly', async () => {
    const likeIncreaseMock = jest.fn();
    render(<Blog blog={blog} currentUser={currentUser} handleBlogDeletion={jest.fn()} handleLikeIncrease={likeIncreaseMock} />)

    const user = userEvent.setup()
    const viewDetailsButton = screen.getByText('view')
    await user.click(viewDetailsButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeIncreaseMock.mock.calls).toHaveLength(2)
  })
});