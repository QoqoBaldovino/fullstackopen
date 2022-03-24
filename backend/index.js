const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const phonebook = [
  {
    id: 1,
    name: 'Qoqo',
    number: '1133829585',
  },
  {
    id: 2,
    name: 'Natalia',
    number: '1122314654'
  }
];

morgan.token('body', (request, response) => {
  if(request.method === 'POST' || request.method === 'PUT'){
    return JSON.stringify(request.body)
  }else{
    return ''
  }
})

const createId = (phonebook) => {
  const ids = phonebook.map(person => person.id)
  const max = Math.max(...ids)
  return max + 1;
}

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${phonebook.length} people</p><p>${new Date}</p>`)
})

app.get('/api/notes', (request, response) => {
  if(phonebook.length === 0){
    response.status(404).send('No hay personas en la lista.')
  }else{
    response.json(phonebook)
  }
  
})

app.get('/api/notes/:id', (request, response) => {

  const {id} = request.params

  if(phonebook.length === 0){
    response.status(404).send('No hay personas en la lista.')
  }else{
    const person = phonebook.filter(person => person.id === parseInt(id))
    
    if(person.length === 0){
      response.status(404).send('No existe.')
    }else{
      response.send(person)
    }
    
  }
  
})

app.delete('/api/notes/:id', (request, response) => {
  const {id} = request.params

  if(phonebook.length === 0){
    response.status(404).send('No hay personas en la lista.')
  }else{
    const person = phonebook.filter(person => person.id === parseInt(id))
    
    if(person.length === 0){
      response.status(404).send('No existe.')
    }else{
      const newList = phonebook.filter(person => person.id !== parseInt(id))
      phonebook.splice(0, phonebook.length)
      console.log(phonebook)
      phonebook.push(newList[0])
      response.status(200).send('Usuario Eliminado.')
    }
    
  }
})

app.post('/api/notes', (request, response) => {
  const {name, number} = request.body
  if(!number || !name){

    response.status(404).send('Name y Number son datos obligatorios.')

  }else{

    const numberExist = phonebook.filter(person => person.number === number)
    if(numberExist.length !== 0){
      response.status(404).send('Ya existe alguien con ese Numero')
    }else{
      const newPerson = {
        id : createId(phonebook),
        name: name,
        number: number,
      }
      
      response.json(newPerson)
      phonebook.push(newPerson)
    }
    
  }
  
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})