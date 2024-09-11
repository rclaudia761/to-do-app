// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css'; // Import the CSS file
import { useTheme } from '../context/ThemeContext';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  const getTaskStatistics = () => {
    const stats = {
      all: tasks.length,
      completed: tasks.filter(task => task.completed).length,
      incomplete: tasks.filter(task => !task.completed).length
    };
    return stats;
  };

  const taskStats = getTaskStatistics();
  const data = {
    labels: ['All Tasks', 'Completed Tasks', 'Incomplete Tasks'],
    datasets: [
      {
        label: 'Task Statistics',
        data: [taskStats.all, taskStats.completed, taskStats.incomplete],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true
      }
    }
  };

  return (
    <div className={`app ${theme}`}>
      <h1 className={`link-text ${theme}`}>Dashboard</h1>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
