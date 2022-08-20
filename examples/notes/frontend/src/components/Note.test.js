import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const noteContent = 'Component testing is done with react-testing library'
  const note = {
    content: noteContent,
    important: true
  }

  render(<Note note={note}/> )

  const element = screen.getByText(noteContent)
  expect(element).toBeDefined()
})