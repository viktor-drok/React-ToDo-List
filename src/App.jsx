import { useEffect, useState } from "react";

import ToDo from "./components/ToDo.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import UpdateForm from "./components/UpdateForm.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
	const [toDo, setToDo] = useState(
		window.localStorage.getItem("task") ? JSON.parse(window.localStorage.getItem("task")) : [],
	);

	const [newTask, setNewTask] = useState("");
	const [updateData, setUpdateData] = useState("");

	//local storage
	// useEffect(() => {
	// 	let data = window.localStorage.getItem("task");
	// 	let startToDo = JSON.parse(data);
	// 	console.log(startToDo);
	// 	setToDo([...startToDo]);
	// }, []);

	useEffect(() => {
		window.localStorage.setItem("task", JSON.stringify(toDo));
	}, [toDo]);

	const addTask = () => {
		if (newTask) {
			let num = toDo.length + 1;
			let newEntry = { id: num, title: newTask, status: false };
			setToDo([...toDo, newEntry]);
			setNewTask("");
		}
	};

	const delTask = id => {
		let newTask = toDo.filter(task => task.id !== id);
		setToDo(newTask);
	};

	const markDone = id => {
		let newTask = toDo.map(task => {
			if (task.id === id) {
				return { ...task, status: !task.status };
			}
			return task;
		});
		setToDo(newTask);
	};

	const changeTask = e => {
		let newEntry = {
			id: updateData.id,
			title: e.target.value,
			ststus: updateData.status ? true : false,
		};
		setUpdateData(newEntry);
	};

	const updateTask = () => {
		let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
		let updatedToDoState = [...filterRecords, updateData];
		setToDo(updatedToDoState);
		setUpdateData("");
	};

	const handleKeyDown = event => {
		if (event.key === "Enter") {
			console.log(event.key);
			addTask();
		}
	};

	return (
		<div className="container App">
			<h1>ToDo List App on ReactJS</h1>
			<br />
			<br />

			{updateData && updateData ? (
				<UpdateForm
					updateData={updateData}
					changeTask={changeTask}
					updateTask={updateTask}
					setUpdateData={setUpdateData}
				/>
			) : (
				<AddTaskForm
					newTask={newTask}
					setNewTask={setNewTask}
					addTask={addTask}
					handleKeyDown={handleKeyDown}
				/>
			)}

			{toDo && toDo.length > 0 ? "" : "No tasks..."}

			<ToDo
				toDo={toDo}
				markDone={markDone}
				setUpdateData={setUpdateData}
				delTask={delTask}
			/>
		</div>
	);
}

export default App;
