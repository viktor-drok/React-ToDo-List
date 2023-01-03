// import style from "./AddTaskForm.module.css";

const AddTaskForm = ({ newTask, setNewTask, addTask, handleKeyDown }) => {
	return (
		<>
			<div className="row">
				<div className="col">
					<input
						value={newTask}
						onChange={e => setNewTask(e.target.value)}
						onKeyDown={handleKeyDown}
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
	);
};

export default AddTaskForm;
