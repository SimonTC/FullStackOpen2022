import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import {CreateNewBlogForm} from "./CreateNewBlogForm";

test('<CreateNewBlogForm/> calls event handler with correct details', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<CreateNewBlogForm handleBlogCreation={createBlog}/> )

  const titleInput = screen.getByText('Title', { exact: false }) // use some other selector
  const authorInput = screen.getByText('Author', { exact: false })
  const urlInput = screen.getByText('Url', { exact: false })
  const submitButton = screen.getByText('Create')

  await user.type(titleInput, 'Some blog title')
  await user.type(authorInput, 'James Bond')
  await user.type(urlInput, 'www.test.com')
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toBe({title: 'Some blog title', author:'James Bond', url:'www.test.com'})
})