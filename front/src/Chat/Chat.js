import React from 'react';
import './Chat.css';
import ChatBox from './ChatBox.js';
import Login from './Login.js';

class Chat extends React.Component {
        constructor(props) {
            super(props);
            this.logged = false;
        }

        render() {
            return (
                <div className="Chat">
                    <h1>Cat chat !</h1>
                    {this.logged ? (<ChatBox />) : (<Login />)}
                </div>
            );
        }
}

export default Chat;
