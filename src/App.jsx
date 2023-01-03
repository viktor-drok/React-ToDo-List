import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
	// ToDo List State
	const [toDo, setToDo] = useState([]);

	const [newTask, setNewTask] = useState("");
	const [updateData, setUpdateData] = useState("");

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

	return (
		<div className="container App">
			<h1>ToDo List App on ReactJS</h1>
			<br />
			<br />

			{updateData && updateData ? (
				<>
					<div className="row">
						<div className="col">
							<input
								value={updateData && updateData.title}
								onChange={e => changeTask(e)}
								type="text"
								className="form-control form-control-lg"
							/>
						</div>

						<div className="col-auto">
							<button
								className="btn btn-lg btn-success mr-20"
								onClick={updateTask}
							>
								Update
							</button>
							<button
								className="btn btn-lg btn-warning"
								onClick={() => {
									setUpdateData("");
								}}
							>
								Cancel
							</button>
						</div>
					</div>
					<br />
				</>
			) : (
				<>
					<div className="row">
						<div className="col">
							<input
								value={newTask}
								onChange={e => setNewTask(e.target.value)}
								type="text"
								className="form-control form-control-lg"
							/>
						</div>

						<div className="col-auto">
							<button
								onClick={addTask}
								className="btn btn-lg btn-success"
							>
								Add Task
							</button>
						</div>
					</div>

					<br />
				</>
			)}

			{/*add task*/}

			{toDo && toDo.length > 0 ? "" : "No tasks..."}

			{toDo &&
				toDo
					.sort((a, b) => (a.id > b.id ? 1 : -1))
					.map((task, index) => {
						return (
							<React.Fragment key={task.id}>
								<div className="col taskBg">
									<div className={task.status ? "done" : ""}>
										<span className="taskNumber">{index + 1}</span>
										<span className="taskText">{task.title}</span>
									</div>

									<div className="iconWrap">
										<span
											title="Completed / Not Completed"
											onClick={e => markDone(task.id)}
										>
											<FontAwesomeIcon icon={faCircleCheck} />
										</span>

										{task.status ? null : (
											<span
												title="Edit"
												onClick={() =>
													setUpdateData({
														id: task.id,
														title: task.title,
														status: task.status ? true : false,
													})
												}
											>
												<FontAwesomeIcon icon={faPen} />
											</span>
										)}

										<span
											title="Delete"
											onClick={() => delTask(task.id)}
										>
											<FontAwesomeIcon icon={faTrashCan} />
										</span>
									</div>
								</div>
							</React.Fragment>
						);
					})}
		</div>
	);
}

export default App;
