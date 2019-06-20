import React from 'react';
import logo from './logo.svg';
import './App.css';
import socketIoClient from "socket.io-client";

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            messageText: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const socket = socketIoClient("http://127.0.0.1:3000");
    }

    handleChange(event) {
        this.setState({
            messageText: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Meow !');
        const socket = socketIoClient("http://127.0.0.1:3000");
        socket.emit('message', this.state.messageText);
        this.setState({
            messageText: ''
        });
    }

    render() {
      return (
        <div className="App">
            <div className="Chat">
                <h1>Cat chat !</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                            type="text"
                            placeholder="Enter a message here..."
                            onChange={this.handleChange}
                            value={this.state.messageText}>

                    </input>
                </form>
                <button type="button">Enter</button>
            </div>
        </div>
      );
    }
}

export default App;
