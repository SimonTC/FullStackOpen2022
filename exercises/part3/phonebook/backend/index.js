const express = require('express')

const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')

const getLogLine = (tokens, request, response) => {
  const baseLogElements = [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms'
  ]

  let logElements = baseLogElements
  if(request.method === "POST"){
     logElements = logElements.concat(JSON.stringify(request.body))
  }

  return logElements.join(' ')
}

morgan.token('body', function (req, res) { return req.body })
app.use(morgan(getLogLine))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const numEntries = persons.length
  const date = new Date()

  const responseText = `<p>Phonebook has info for ${numEntries} people</p><p>${date}</p>`

  response.writeHead(200, {'Content-Type': 'text/html' })
  response.end(responseText)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person){
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, respone) => {
  const body = request.body

  if(!body.name){
    return respone.status(400).json({
      error: 'name is missing'
    })
  }

  if(!body.number){
    return respone.status(400).json({
      error: 'number is missing'
    })
  }

  if(persons.find(person => person.name === body.name)){
    return respone.status(400).json({
      error: 'name must be unique'
    })
  }

  const id = Math.floor(Math.random() * 1_000_000_000)
  const person = {
    id: id,
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  respone.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})