require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(express.static('build'))

app.use(cors())

const getLogLine = (tokens, request, response) => {
  let logElements = [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms'
  ]
  if(request.method === 'POST'){
    logElements = logElements.concat(JSON.stringify(request.body))
  }

  return logElements.join(' ')
}

morgan.token('body', function (req, res) { return req.body })
app.use(morgan(getLogLine))
app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  Person.countDocuments({})
    .then(count => {
      const numEntries = count
      const date = new Date()
      const responseText = `<p>Phonebook has info for ${numEntries} people</p><p>${date}</p>`

      response.writeHead(200, { 'Content-Type': 'text/html' })
      response.end(responseText)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(_ => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, respone, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      respone.json(savedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError'){
    return response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError'){
    return response.status(400).send({ error: error.message })
  }

  next(error) // Send error on to the default express errorhandler
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})