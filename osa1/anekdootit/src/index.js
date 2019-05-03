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

const App = (props) => {
	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
	
	const next = () => {
		setSelected(Math.floor(Math.random()*(props.anecdotes.length)));
	}
	const vote = () => {
		const copy = [...votes];
		copy[selected] += 1;
		setVotes(copy);
	}
	
	var most_voted = 0;
	for (var i = 0; i < props.anecdotes.length; ++i) {
		if (votes[i] > votes[most_voted])
			most_voted = i;
	}
	
	return (
	<div>
		<h3>Anecdote of the day</h3>
		{props.anecdotes[selected]}<br/>
		has {votes[selected]} votes<br/>
		<button onClick={() => vote()}>vote</button>
		<button onClick={() => next()}>next anecdote</button>
		<h3>Anecdote with most votes</h3>
		{props.anecdotes[most_voted]}<br/>
		has votes {votes[most_voted]}<br/>
    </div>
	)
}


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)