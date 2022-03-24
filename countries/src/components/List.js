import React from "react";
import Country from "./Country";


const handleClick = (name, countries, setFilterC) => {
  let country = countries.filter(country => country.name['common'] === name)
  setFilterC(country)
}

const List = ({countries, setFilterC}) => {
  return (<>
    <ul>
      {countries.length !== 1 ? countries.map(country => <li>{country.name['common']}<button onClick = {() => handleClick(country.name['common'], countries, setFilterC)}>Show</button></li>) : <Country country = {countries}/>}
    </ul>
  </>)
}

export default List