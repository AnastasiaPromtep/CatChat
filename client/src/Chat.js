
import React from 'react';
import './Chat.css';
import UserSettings from './UserSettings.js';
import socketIoClient from 'socket.io-client';


// Message {
//  text: user-input
//  author:
//  timestamp:
//  }
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            username: 'me',
            messages: []
        };
        this.socket = socketIoClient("http://127.0.0.1:3000");
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnclickClear = this.handleOnclickClear.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    componentDidMount() {
        this.socket.on('message', (message) => {
            this.setState(state => {
                const list = [...state.messages, message]
                return {
                    input: state.input,
                    messages: list
                };
            });
        });
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Meow !');
        const msg = {
            text: this.state.input,
            author: this.state.username
        }
        this.socket.emit('message', msg);
        this.setState(state => {
            const list = [...state.messages, msg];
            return {
                input: '',
                messages: list
            };
        });
    }

    handleUsernameChange(username) {
        this.setState({
            username: username
        });
        console.log(username);
        console.log(this.state.username);
    }

    handleOnclickClear(event) {
        this.setState({messages: []});
    }

    render() {
        return (
            <div className="Chat">
                <h1>Cat chat !</h1>
                <div className="MessageList">
                        {this.state.messages.map(message => {
                            return (
                                <span>{message.author}: {message.text}</span>
                            )
                        })}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input
                            type="text"
                            placeholder="Enter a message here..."
                            onChange={this.handleChange}
                            value={this.state.input} required>
                    </input>
                    <button type="submit">Enter</button>
                </form>
                <button type="button" onClick={this.handleOnclickClear}>Clear chat</button>
                <UserSettings username={this.state.username} handleUsernameChange={this.handleUsernameChange}/>
            </div>
        );
    }
}

export default Chat;
