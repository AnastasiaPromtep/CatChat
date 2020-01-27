import React from 'react';

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.messages
        };
        this.messageEnd = null;
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.messageEnd.scrollIntoView({ behavior: "smooth"});
    }

    render() {
        return(
            <div className="MessageList">
                    {this.props.messages.map(message => {
                        return (
                            <span>{message.author}: {message.text}</span>
                        )
                    })}
                    <span ref={(el => {this.messageEnd = el})}></span>
            </div>
        );
    }
}

export default MessageBox;
