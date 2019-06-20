import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            messageText: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            messageText: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Meow !');
        this.setState({
            messageText: ''
        });
    }

    render() {
      return (
        <div className="App">
            <div className="Chat">
                <h1>Cat chat !</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                            type="text"
                            placeholder="Enter a message here..."
                            onChange={this.handleChange}
                            value={this.state.messageText}>

                    </input>
                </form>
                <button type="button">Enter</button>
            </div>
        </div>
      );
    }
}

export default App;
