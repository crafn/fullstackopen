import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import personService from './components/PersonService'
import './index.css'

const Find = ({find, handleChange}) => {
	return (
		<div>rajaa näytettäviä: <input
			value={find}
			onChange={handleChange}
		/>
		</div>
	);
}

const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
	return (
		<form onSubmit={addName}>
			<div>
				nimi: <input 
					value={newName}
					onChange={handleNameChange}
					/>
			</div>
			<div>
				numero: <input 
					value={newNumber}
					onChange={handleNumberChange}
					/>
			</div>
			<div>
				<button type="submit">lisää</button>
			</div>
		</form>
	)
}

const Persons = ({persons, find, deletePerson}) => {
	return (
			persons.filter((p) => (find.length === 0 || p.name.toLowerCase().includes(find.toLowerCase())))
			.map((p) => <p key={p.name}>{p.name}, {p.number}
			<button onClick={() => deletePerson(p.id)}>Poista</button>
			</p>)
	)
}

const Notification = ({message, isError}) => {
	if (message === null || message === undefined)
		return null

	if (isError) {
		return (<div className="error">{message}</div>)
	} else {
		return (<div className="notification">{message}</div>)
	}
}

const App = () => {
	
	const [persons, setPersons] = useState([]) 
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [find, setFind] = useState('')
	const [notification, setNotification] = useState(null)

	const handleNameChange = (evt) => {
		setNewName(evt.target.value)
	}
	
	const handleNumberChange = (evt) => {
		setNewNumber(evt.target.value)
	}
	
	const showNotification = (message, isError) => {
		setNotification({message, isError})
		setTimeout(() => {
			setNotification(null)
		}, 5000)
	}
	
	const addName = (evt) => {
		evt.preventDefault();
		
		const newPerson = {
			name: newName,
			number: newNumber,
		};
		
		const found = persons.filter((p) => p.name.toLowerCase() === newName.toLowerCase())
		if (found.length > 0) {
			if (window.confirm(`${newName} on jo luettelossa, korvataako numero?`)) {
				personService.update(found[0].id, newPerson)
				.then(res => {
					setPersons(persons.map(p => (p.id === found[0].id ?
					{ name: p.name, number: newPerson.number, id: p.id }
					:
					p)))
					setNewName('')
					setNewNumber('')
					showNotification(`Päivitettiin ${newPerson.name}`);
				})
				.catch(err => showNotification(`Henkilön ${newPerson.name} päivittäminen epäonnistui`, true))
			}
			return
		}
		
		personService.create(newPerson)
		.then(res => {
			setPersons(persons.concat(res))
			showNotification(`Lisättiin ${newPerson.name}`);
			setNewName('')
			setNewNumber('')
		})
		.catch(err => showNotification(`Henkilön ${newPerson.name} lisääminen epäonnistui`, true));
	}
	
	
	const handleFindChange = (evt) => {
		setFind(evt.target.value)
	}
	
	const deletePerson = (id) => {
		const name = persons.filter(p => p.id === id)[0].name;
		if (window.confirm(`Poistetaanko ${name}?`)) {
			personService.remove(id).then(res => {
				setPersons(persons.filter(p => p.id !== id));
				showNotification(`Poistettiin ${name}`);
			})
			.catch(err => showNotification(`Henkilön ${name} poistaminen epäonnistui`, true));
		}
	}
	
	useEffect(() => {
		personService.getAll()
		.then(data => {
			setPersons(data)
		})
	}, []);
	
	return (
		<div>
		<h2>Puhelinluettelo</h2>
		<Notification {...notification} />
		<Find find={find} handleChange={handleFindChange} />

		<h3>lisää uusi</h3>
		<PersonForm {...{addName, newName, handleNameChange, newNumber, handleNumberChange}} />
		
		<h2>Numerot</h2>
		<Persons {...{persons, find, deletePerson}} />

		</div>
	)

}

ReactDOM.render(<App />, document.getElementById('root'))