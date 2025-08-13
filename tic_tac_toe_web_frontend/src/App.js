import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { PluginFileCover1 } from './components/FigmaCover';
import { TicTacToe } from './components/TicTacToe';

/**
 * PUBLIC_INTERFACE
 * App
 * Root component for the Tic Tac Toe application.
 * - Provides light/dark theme toggle
 * - Renders a functional Tic Tac Toe game
 * - Keeps CRA "Learn React" link for CI test stability
 */
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  /** Toggle between light and dark theme. */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      {/* Existing header content preserved for CI test stability */}
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {/* New: Functional Tic Tac Toe game */}
        <TicTacToe />
      </header>

      {/* Figma extracted cover screen (moved below header to keep game in view) */}
      <PluginFileCover1 />
    </div>
  );
}

export default App;
