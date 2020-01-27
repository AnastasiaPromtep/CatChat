import React from 'react';
import './Chat.css';
import UserSettings from './UserSettings.js';
import MessageForm from './MessageForm.js';
import MessageBox from './MessageBox.js';
import socketIoClient from 'socket.io-client';


// Message {
//  text: user-input
//  author:
//  timestamp:
//  }
class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'me',
            messages: []
        };
        this.loggedIn = false;
        this.socket = socketIoClient("http://127.0.0.1:3000");
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.handleOnclickClear = this.handleOnclickClear.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    componentDidMount() {
        this.socket.on('message', (message) => {
            this.setState(state => {
                const list = [...state.messages, message]
                return {
                    messages: list
                };
            });
        });
    }

    handleMessageSubmit(message) {
        console.log('Meow !');
        const msg = {
            text: message,
            author: this.state.username
        }
        this.socket.emit('message', msg);
        this.setState(state => {
            const list = [...state.messages, msg];
            return {
                messages: list
            };
        });
    }

    handleUsernameChange(username) {
        this.setState({
            username: username
        });
    }

    handleOnclickClear(event) {
        this.setState({messages: []});
    }

    render() {
        return (
            <div className='ChatBox'>
                <MessageBox messages={this.state.messages}/>
                <MessageForm onSubmit={this.handleMessageSubmit}/>
                <button type="button" onClick={this.handleOnclickClear}>Clear chat</button>
                <UserSettings username={this.state.username} onSubmit={this.handleUsernameChange}/>
            </div>
        );
    }
}

export default ChatBox;
