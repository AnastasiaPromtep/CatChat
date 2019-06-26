import React from 'react';

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.input);
        this.setState({input: ''});
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input
                        type="text"
                        placeholder="Enter a message here..."
                        onChange={this.handleChange}
                        value={this.state.input} required>
                </input>
                <button type="submit">Enter</button>
            </form>
        );
    }
}

export default MessageForm;
