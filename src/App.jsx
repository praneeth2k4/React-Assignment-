import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { loadTasks, saveTasks } from './utils/localStorage';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [tasks, setTasks] = useState(loadTasks());
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleLogin = (name) => {
    setUsername(name);
  };

  const handleAddOrEditTask = (task) => {
    if (task.id) {
      setTasks(tasks.map(t => t.id === task.id ? { ...t, ...task } : t));
      setEditingTask(null);
    } else {
      const newTask = {
        id: Date.now(),
        title: task.title,
        description: task.description,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks([newTask, ...tasks]);
    }
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className={`app-container${darkMode ? ' dark' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Welcome, {username}!</h2>
        <div>
          <button className="dark-toggle" onClick={() => setDarkMode(dm => !dm)}>
            {darkMode ? '🌙 Dark' : '☀️ Light'}
          </button>
          <button className="logout-btn" onClick={() => { localStorage.removeItem('username'); setUsername(''); }}>⏻ Logout</button>
        </div>
      </div>
      <TaskForm onSave={handleAddOrEditTask} editingTask={editingTask} onCancel={handleCancelEdit} />
      <TaskFilter filter={filter} setFilter={setFilter} counts={counts} />
      <TaskList tasks={filteredTasks} onToggle={handleToggleTask} onEdit={handleEditTask} onDelete={handleDeleteTask} />
    </div>
  );
}

export default App;
