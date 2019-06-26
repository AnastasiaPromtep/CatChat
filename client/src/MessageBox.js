import React from 'react';

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.messages
        };
    }

    render() {
        return(
            <div className="MessageList">
                    {this.props.messages.map(message => {
                        return (
                            <span>{message.author}: {message.text}</span>
                        )
                    })}
            </div>
        );
    }
}

export default MessageBox;
