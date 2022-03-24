import React from "react";
import Part from "./Part";

const Content = ({key, parts}) => {
  console.log(key)

  let total = parts.map(part => part.exercises).reduce((prev, curr)=> prev + curr, 0)


  return (
    <div key = {key}>
      {parts.map(part => <Part key = {key} name = {part.name} exercises = {part.exercises}/>)
      }
      {<b>Total of {total} exercises</b>}
      {<p>{key}</p>}
    </div>
  )

}

export default Content