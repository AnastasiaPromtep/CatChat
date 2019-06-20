import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
        <div className="Chat">
            <h1>Cat chat !</h1>
            <textarea row="1" col="30" placeholder="Enter a message here..."></textarea>
            <button type="button">Enter</button>
        </div>
    </div>
  );
}

export default App;
