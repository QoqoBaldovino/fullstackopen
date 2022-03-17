import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  const {name} = props.course;
  return (
    <h1>{name}</h1>
  )
}

const Part = (props) => {
  const {name, exercises} = props.part;
  return (
    <>
      <p><b>{name}</b> {exercises}</p>
    </>
  )
}

const Content = (props) => {
  const {part1, part2, part3} = props;
  return (
    <>
      <Part part = {part1}/>
      <Part part = {part2}/>
      <Part part = {part3}/>
    </>
  )
}

const Footer = (props) => {
  return (<>
    <p>Number of exercises: {props.number}</p>
  </>)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course} />
      <Content 
        part1 = {course.parts[0]}
        part2 = {course.parts[1]}
        part3 = {course.parts[2]}
      />
      <Footer number = {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))