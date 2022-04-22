require('dotenv').config() // Must be imported first to ensure the environment variables are available globally
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')
const app = express()

app.use(cors())
app.use(express.static('build'))

app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next() // Yields control to the next middleware
}

app.use(requestLogger)

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true
  }]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({})
    .then((notes => {
      response.json(notes)
    }))
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if(note){
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error)) // By using next(xxx) the error is sent to the next middleware
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content){
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError'){
    return response.status(400).send({error: 'malformed id'})
  }

  next(error) // Send error on to the default express errorhandler
}

app.use(errorHandler) // use errorHandler as the middleware used to handle errors when next(xxx) is called

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})