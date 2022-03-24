import React from "react";

const Country = ({country}) => {
 console.log(country)
  return(
    <div>
      <h1>{country[0].name.common}</h1>
      <p>Capital: {country[0].capital}</p>
      <p>Population: {country[0].population} habitants.</p>
      <h3>Spoken Languages</h3>
      <ul>{(Object.values(country[0].languages)).map(lang => <li>{lang}</li>)}</ul>
      <div>
        <img src = {country[0].flags.png} alt = "flag"/>
      </div>
    
    </div>
    
  )
}

export default Country