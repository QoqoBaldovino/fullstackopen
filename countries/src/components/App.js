import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "./List";

const App = () => {

  const [countries, setCountries] = useState([])
  const [filterC, setFilterC] = useState([]);
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    let filtered =  countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    setFilterC(filtered)
  }, [countries, search])


  const handleSearch = (event) => {
    setSearch(event.target.value)
    
  }

  return (
    <>
      <h1>Find Countries</h1>
      <input onChange = {handleSearch} placeholder="Type here..."/>
      {filterC.length === 0 ? <p>No matches found.</p>: <List countries = {filterC} setFilterC = {setFilterC}/>}
      
    </>
  )
}

export default App