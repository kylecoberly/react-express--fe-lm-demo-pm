import './App.css';
import { useState, useEffect } from "react"

function App() {
	const [students, setStudents] = useState([])
	const [name, setName] = useState("")

	useEffect(() => {
		fetch("http://localhost:4000/students")
			.then(response => response.json())
			.then(response => {
				setStudents(response.students)
			})
	}, [])

	const updateName = (event) => {
		setName(event.target.value)
	}

	const addName = (event) => {
		event.preventDefault()
		fetch("http://localhost:4000/students", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ student: { name: event.target["name"].value } })
		}).then(response => response.json())
			.then(response => {
				setStudents([...students, response.student])
				setName("")
			})
	}

	return (
		<div className="App">
			<h1>Students</h1>
			<form onSubmit={addName}>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="name"
					id="name"
					className="name"
					value={name}
					onInput={updateName}
				/>

				<input type="submit" value="Add name" />
			</form>
			<ul>
				{students.map(({ id, name }) => (
					<li key={id}>{name}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
