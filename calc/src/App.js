import React, { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => setInput('');
  const handleDelete = () => setInput((prev) => prev.slice(0, -1));

  const handleCalculate = () => {
    try {
      // Replace custom operators for eval
      const replaced = input
        .replace(/√/g, 'Math.sqrt')
        .replace(/\^/g, '**');
      const result = eval(replaced).toString();
      setHistory([...history, `${input} = ${result}`]);
      setInput(result);
    } catch {
      setInput('Error');
    }
  };

  const handleKeyDown = (e) => {
    const allowedKeys = '0123456789+-*/().%^';
    if (allowedKeys.includes(e.key)) handleClick(e.key);
    else if (e.key === 'Enter') handleCalculate();
    else if (e.key === 'Backspace') handleDelete();
    else if (e.key === 'Escape') handleClear();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  return (
    <div className={`calculator-container ${darkMode ? 'dark' : ''}`}>
      <div className="top-bar">
        <h2>React Calculator</h2>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <input type="text" className="display" value={input} readOnly />

      <div className="buttons">
        {[
          '(', ')', '√(', '^',
          '7', '8', '9', '/',
          '4', '5', '6', '*',
          '1', '2', '3', '-',
          '0', '.', '=', '+',
        ].map((btn) =>
          btn === '=' ? (
            <button key={btn} onClick={handleCalculate}>=</button>
          ) : (
            <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
          )
        )}
        <button onClick={handleClear}>C</button>
        <button onClick={handleDelete}>←</button>
      </div>

      <div className="history">
        <h4>History</h4>
        <ul>
          {history.slice(-5).reverse().map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
