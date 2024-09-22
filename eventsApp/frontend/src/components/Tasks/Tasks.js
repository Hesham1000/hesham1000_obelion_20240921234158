import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(() => {
      axios.post('http://localhost:8000/api/tasks/notify');
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const addTask = async () => {
    if (taskText.trim()) {
      try {
        const response = await axios.post('http://localhost:8000/api/tasks', { text: taskText });
        setTasks([...tasks, response.data]);
        setTaskText('');
      } catch (error) {
        console.error('Failed to add task', error);
      }
    }
  };

  const toggleTaskCompletion = async (id) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      try {
        const response = await axios.put(`http://localhost:8000/api/tasks/${id}`, { ...task, completed: !task.completed });
        setTasks(tasks.map(t => (t.id === id ? response.data : t)));
      } catch (error) {
        console.error('Failed to update task', error);
      }
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'ALL') return true;
    return filter === 'COMPLETED' ? task.completed : !task.completed;
  }).filter(task => task.text.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="tasks-container">
      <h1 className="tasks-title">TODO LIST</h1>
      <div className="tasks-controls">
        <input
          type="text"
          className="tasks-search-bar"
          placeholder="Search note..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select className="tasks-filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="ALL">ALL</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="PENDING">PENDING</option>
        </select>
      </div>
      <ul className="tasks-list">
        {filteredTasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span>{task.text}</span>
          </li>
        ))}
      </ul>
      <button className="add-task-button" onClick={addTask}>
        <span>+</span>
      </button>
    </div>
  );
};

export default Tasks;
