import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Found = ({explicitCountry, find, countries, showCountry}) => {
	const [ weather, setWeather ] = useState(null)
	const found = countries.filter((c) => c.name.toLowerCase().includes(find.toLowerCase()))
	
	useEffect(() => {
		if (found.length === 1 || explicitCountry) {
			const city = (explicitCountry || found[0]).capital;
			axios.get(`https://api.apixu.com/v1/current.json?key=93205c47e7aa4cc7bc4100312190405&q=${city}`)
			.then((response) => {
				console.log(response)
				setWeather(response.data)
			})
		} else {
			setWeather(null)
		}
		
	}, [explicitCountry, find]);
	
	if (found.length === 1 || explicitCountry) {
		const c = explicitCountry || found[0];
		return (
			<div>
			<h3>{c.name}</h3>
			<p>capital {c.capital}</p>
			<p>population {c.population}</p>
			<h4>languages</h4>
			<ul>
			{ c.languages.map((l) => <li key={l.name}>{l.name}</li>) }
			</ul>
			<img src={c.flag} height="100" />
			{
				weather ?
				<div>
				<h4>Weather in {c.capital}</h4>
				<p>Temperature: {weather.current.temp_c} Celsius</p>
				<img src={weather.current.condition.icon} />
				<p>Wind: {weather.current.wind_kph} kph</p>
				</div>
				:
				null
			}
			</div>
		)
	} else if (found.length > 10) {
		return <p>Too many matches, specify another filter</p>
	} else {
		return found.map((c) => <p key={c.name}>{c.name}
			<button
				onClick={() => showCountry(c)}
			>Show</button></p>)
	}
}

const App = () => {
	
	const [ find, setFind ] = useState('')
	const [ countries, setCountries ] = useState([])
	const [ explicitCountry, setExplicitCountry ] = useState(null)
	const showCountry = (country) => {
		setExplicitCountry(country);
	}
	
	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all')
		.then((response) => {
			setCountries(response.data);
		});
	}, [])

	const findChange = (evt) => {
		setFind(evt.target.value);
		setExplicitCountry(null);
	}

	return (
		<div>
		<p>find countries 
		<input 
			onChange={findChange}
		/></p>
		<Found {...{explicitCountry, find, countries, showCountry}} />		
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))