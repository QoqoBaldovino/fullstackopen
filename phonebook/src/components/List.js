import React from 'react'

const List = ({list, handleDelete}) => {
  return (
    <div>
      <h2>Persons</h2>
      {list.map(person => <p key ={person.id}><b>{person.name}</b>: {person.number}<button onClick = {() => handleDelete(person.name)}>X</button></p>)}
    </div>
  )
}

export default List