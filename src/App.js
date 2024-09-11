import logo from './logo.svg';
import './App.css';
import { useContext } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './global.css'; // Ensure global styles are imported
import Dashboard from './Screens/Dashboard';
import ToDoList from './Screens/ToDoList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ThemeSwitcher from './components/ThemeSwitcher';

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

        {/* <MainComponent />

  <Dashboard/>
  <ToDoList /> */}

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
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
      {/* <ThemeSwitcher/> */}
    </nav>
  );
};

// const MainComponent = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <div className={`app ${theme}`}>
//       <h1>{`Current Theme: ${theme}`}</h1>
//       <button onClick={toggleTheme}>
//         Toggle Theme
//       </button>
//     </div>
//   );
// };

export default App;
