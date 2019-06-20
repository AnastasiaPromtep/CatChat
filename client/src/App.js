import React from 'react';
import logo from './logo.svg';
import './App.css';
import socketIoClient from "socket.io-client";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messageText: '',
            messages: []
        };
        this.socket = socketIoClient("http://127.0.0.1:3000");
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.socket.on('message', (message) => {
            console.log(message);
            this.setState(state => {
                const list = [...state.messages, message]
                return {
                    messageText: state.messageText,
                    messages: list
                };
            });
        });
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
                <ul>
                    {this.state.messages.map(message => {
                        return (
                            <li>{message}</li>
                        )
                    })}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <input
                            type="text"
                            placeholder="Enter a message here..."
                            onChange={this.handleChange}
                            value={this.state.messageText} required>
                    </input>
                    <button type="submit">Enter</button>
                </form>
            </div>
        </div>
      );
    }
}

export default App;
