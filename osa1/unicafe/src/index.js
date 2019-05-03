import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
	<button onClick={props.handleClick}>
		{props.text}
	</button>
)

const Statistic = ({text, value}) => {
	return ( <tr><td>{text}</td><td>{value}</td></tr> )
}

const Statistics = ({good, neutral, bad}) => {
	return (
		<div>
		<h3>Statistiikka</h3>
		{
			(good + neutral + bad === 0) ? 
			( <p>Ei yhtään palautetta annettu</p> ) :
			(
				<table><tbody>
				<Statistic text="hyvä" value={good} />
				<Statistic text="neutraali" value={neutral} />
				<Statistic text="huono" value={bad} />
				<Statistic text="yhteensä" value={good + neutral + bad} />
				<Statistic text="keskiarvo" value={(good - bad)/(good + neutral + bad)} />
				<Statistic text="positiivisia" value={good/(good + neutral + bad)*100 + "%"}/>
				</tbody></table>
			)
		}
		</div>

	)
}

const App = () => {
	// tallenna napit omaan tilaansa
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
	<div>
		<h3>Anna palautetta</h3>
		<Button text="hyvä" handleClick={() => setGood(good + 1)} />
		<Button text="neutraali" handleClick={() => setNeutral(neutral + 1)} />
		<Button text="huono" handleClick={() => setBad(bad + 1)} />
		<Statistics good={good} neutral={neutral} bad={bad} />
	</div>
	)
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)