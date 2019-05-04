import React from 'react'

const Header = ({course}) => {
	return (
		<h1>{course.name}</h1>
	)
}

const Part = ({name, exercises}) => {
	return (
		<p>{name} {exercises}</p>
	)
}

const Content = ({parts}) => {
	return (
		<div>
		{ parts.map((part) => {
			return <Part key={part.id} name={part.name} exercises={part.exercises} />
		})}
		</div>
	)
}

const Total = ({parts}) => {
	const total = parts.reduce( (s, p) => (s.exercises || s) + p.exercises)
	return (
		<p>yhteensä {total} tehtävää</p>
	)
}

const Course = ({course}) => {
	return (
		<div>
		<Header course={course} />
		<Content parts={course.parts} />
		<Total parts={course.parts} />
		</div>
	)
}

export default Course