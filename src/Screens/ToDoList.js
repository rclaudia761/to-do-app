// components/TaskList.js
import React, { useState, useEffect } from 'react';
import useFetchTasks from '../hooks/useFetchTasks';
import { useTheme } from '../context/ThemeContext';

import './ToDoList.css'; // Import the CSS file
const ToDoList = () => {
  const { tasks: initialTasks, loading, error } = useFetchTasks('https://jsonplaceholder.typicode.com/todos');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // State for task filter
  const [sortOption, setSortOption] = useState('date'); // State for sorting option
  const { theme, toggleTheme } = useTheme();

  // Key for localStorage
  const LOCAL_STORAGE_KEY = 'tasks';

  // Load tasks from localStorage and API when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTasks) {
      setTasks(storedTasks);
    } else {
      setTasks(initialTasks);
    }
  }, [initialTasks]);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  // Handle form submission to add a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const newTaskObject = {
        id: Date.now(), // Generate unique ID using timestamp
        title: newTask,
        completed: false,
        createdAt: new Date() // Track creation date
      };
      setTasks([newTaskObject, ...tasks]);
      setNewTask('');
    }
  };

  // Handle task deletion
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Handle filter selection
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Handle sort selection
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true; // Show all tasks when filter is 'all'
  });

  // Sort tasks based on the selected sort option
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOption === 'date') {
      // Sort by creation date (most recent first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOption === 'title-asc') {
      // Sort by task title alphabetically (A-Z)
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'title-desc') {
      // Sort by task title alphabetically (Z-A)
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error fetching tasks: {error}</p>;

  return (
    <div  className={`app ${theme} task-list-container`}>
      <h1 className={`link-text ${theme}`}>Task List</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <div>
        <label>Filter Tasks: </label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Sort By: </label>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="date">Creation Date</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
        </select>
      </div>
      <ul>
        {sortedTasks.slice(0, 10).map((task) => (
          <li key={task.id}>
            <span  >
              {task.title}
            </span>
            {!task.completed && <button onClick={() => toggleTaskCompletion(task.id)}>Complete</button>} 
            {/* {task.completed} */}
            
            <button class="delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;


