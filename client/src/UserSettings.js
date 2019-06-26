import React from 'react';

class UserSettings extends React.Component {
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
        this.setState({ input: ''});
        this.props.handleUsernameChange(this.state.input);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' placeholder={this.props.username} onChange={this.handleChange} value={this.state.input}></input>
                <button type='submit' onChange={this.handleChange}>Username</button>
            </form>
        );
    }
}

export default UserSettings;
