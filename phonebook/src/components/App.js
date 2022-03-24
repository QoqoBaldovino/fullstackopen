import React, { useEffect } from "react";
import { useState } from "react";
import List from "./List";
import FilteredList from "./FilteredList"
import phoneServices from '../services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    phoneServices
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])
  

  const handleChange = (event) => {
    setFilter(event.target.value);

    if(event.target.value !== ''){
      const lowerCase = persons.map(person => person.name.toLocaleLowerCase())
      const includes = lowerCase.filter(name => name.includes(event.target.value.toLocaleLowerCase()))
      setFilterList(includes)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    if(name !== '' && phone !== ''){

      const exist = persons.filter(person => person.name === name)

      if(exist.length !== 0){

        const newPerson = {
          name: exist[0].name,
          number: phone,
        }

        phoneServices
        .update(exist[0].id, newPerson).then(response => {
          
          phoneServices.deleted(response.id)
          phoneServices.getAll().then(response => {
            const old = response.filter(person => person.id !== response.id)
            setPersons(old)
            document.location.reload(true)
          })
        })

      }
      
      const newPerson = {
        name: name,
        number: phone
      }

      phoneServices
        .create(newPerson)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))    
        })
      
    }else{
      alert('LOS CAMPOS SON OBLIGATORIOS!');
    }
  }

  const handleDelete = (name) => {

    const personAux = persons.filter(person => person.name === name)
    phoneServices
      .deleted(personAux[0].id)
    
    const newList = persons.filter(person => person.id !== personAux[0].id)
    setPersons(newList)

  }

  const handlerName = (event) => {setName(event.target.value)}

  const handlerPhone = (event) => {setPhone(event.target.value)}

  return (
    <>
      <h1>PHONEBOOK</h1>
      
      {
        persons.length !== 0 ? 
        <div>
          <h2>Filter persons</h2>
          <input onChange={handleChange} placeholder="Name... "/>
        </div> 
        : ''
      }

      
      {<>
        <h2>Add a new person</h2>
        <form onSubmit={addPerson}>
          <input onChange={handlerName}placeholder="Name..."/>
          <input onChange = {handlerPhone}placeholder="Phone..."/>
          <button>Add</button>
        </form>
       </>
      }

      {
        persons.length !== 0 ? (filter === '' ? <List list = {persons} handleDelete = {handleDelete}/> : <FilteredList list = {filterList}/>) : <p> No persons to show :C</p>
      }
    </>
  )
}

export default App