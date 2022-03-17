import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const handleNext = (setSelected) => {
  setSelected(Math.floor(Math.random() * ((anecdotes.length- 1) - 0 + 1) + 0))
}

const handleLike = (selected,likes,setLikes) => {
  
  const copy = {...likes};
  copy[selected] += 1;
  setLikes(copy);
}

const maxNumber = (likes) => {
  
  let arr = Object.values(likes);
  let max = Math.max(...arr)
  return isNaN(max) ? 0 : max
}

const indexMax = (likes, numberLikes) => {
  let arr = Object.values(likes);
  return arr.findIndex(value => value === numberLikes);
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [likes, setLikes] = useState({0: 0, 1: 0, 2:0, 3:0, 4:0, 5:0})

  return (
    <div>
      <h1>{props.anecdotes[selected]}</h1>
      <div>
        <button onClick={() => {handleLike(selected, likes, setLikes)}}>Like</button>
        <button onClick={() => {handleNext(setSelected)}}>Next</button>
        <p>
        {likes[selected] === 0 ? 'This anecdote dont have any like yet.' : `Votes: ${likes[selected]}`}</p>
      </div>
      <div>
      {
        maxNumber(likes) === 0 ? 'Any anecdote without likes' : 
      
        
          <>
            <h4>Anecdote more liked:</h4>
            <p><i>{props.anecdotes[indexMax(likes, maxNumber(likes))]}</i></p>
            <p>{`With ${maxNumber(likes)} votes.`}</p>
          </>
        
        
        }
      </div>
    </div>
  )
}



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)