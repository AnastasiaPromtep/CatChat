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
        this.handleOnclickClear = this.handleOnclickClear.bind(this)
    }

    componentDidMount() {
        this.socket.on('message', (message) => {
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
        this.socket.emit('message', this.state.messageText);
        this.setState({
            messageText: ''
        });
    }

    handleOnclickClear(event) {
        this.setState({messages: []});
    }

    render() {
      return (
        <div className="App">
            <div className="Chat">
                <h1>Cat chat !</h1>
                <div className="MessageList">
                        {this.state.messages.map(message => {
                            return (
                                <span>Amazing Cat: {message}</span>
                            )
                        })}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input
                            type="text"
                            placeholder="Enter a message here..."
                            onChange={this.handleChange}
                            value={this.state.messageText} required>
                    </input>
                    <button type="submit">Enter</button>
                </form>
                <button type="button" onClick={this.handleOnclickClear}>Clear chat</button>
            </div>
        </div>
      );
    }
}

export default App;
