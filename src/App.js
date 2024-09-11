import './App.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './global.css'; // Ensure global styles are imported
import Dashboard from './Screens/Dashboard';
import ToDoList from './Screens/ToDoList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider>

<Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/toDoList" element={<ToDoList />} />
        </Routes>
      </Router>
    </ThemeProvider>
   
  );
}
const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`app ${theme}`}>
      <ul>
        <li><Link to="/" className={`link-text ${theme}`} >Home</Link></li>
        <li><Link to="/toDoList" className={`link-text ${theme}`}>Tasks</Link></li>
      </ul>
      <button onClick={toggleTheme }style={{float:'right'}}>
       {`Switch to: ${theme === 'light'? 'dark':'light'}`}
      </button>
    </nav>
  );
};



export default App;
