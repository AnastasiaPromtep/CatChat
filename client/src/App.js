import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './Chat.js'

class App extends React.Component {
    render() {
      return (
        <div className="App">
            <Chat />
        </div>
      );
    }
}

export default App;
