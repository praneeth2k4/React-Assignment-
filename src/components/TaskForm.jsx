import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSave, editingTask, onCancel }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		if (editingTask) {
			setTitle(editingTask.title);
			setDescription(editingTask.description || '');
		} else {
			setTitle('');
			setDescription('');
		}
	}, [editingTask]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (title.trim()) {
			onSave({
				...editingTask,
				title,
				description,
			});
			setTitle('');
			setDescription('');
		}
	};

	return (
		<form className="task-form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Task title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<textarea
				placeholder="Description (optional)"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<div className="form-actions">
				<button type="submit">{editingTask ? '📝Update' : '➕ Add'} Task </button>
				{editingTask && (
					<button type="button" onClick={onCancel}>
						Cancel
					</button>
				)}
			</div>
		</form>
	);
};

export default TaskForm;
