const mongoose = require('mongoose')

const args = process.argv;
if (args.length < 3){
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = args[2]

const url =
  `mongodb+srv://fullstackopen:${password}@cluster0.xr3g3.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

function addPerson(name, number) {
  const id = Math.floor(Math.random() * 1_000_000_000)
  const person = new Person({
    id: id,
    name: name,
    number: number
  })

  person
    .save()
    .then(result => {
      console.log(`Added ${result.name} number ${result.number} to phonebook`)
      mongoose.connection.close()
    })
}

function listPersons() {
  console.log('Phonebook:')
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}

if (args.length > 3){
  addPerson(args[3], args[4]);
} else {
  listPersons();
}
