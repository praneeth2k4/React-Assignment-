import React from 'react';

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <div className="task-info">
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          <span className="task-date">{new Date(task.createdAt).toLocaleString()}</span>
        </div>
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
