import React from 'react';

class UserSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' placeholder={this.props.username} onChange={this.handleChange} value={this.state.input}></input>
                <button type='submit' onChange={this.handleChange}>Username</button>
            </form>
        );
    }
}

export default UserSettings;
