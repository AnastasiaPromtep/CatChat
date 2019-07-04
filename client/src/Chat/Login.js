import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form>
                <input type='email' placeholder='username'></input>
                <input type='password' placeholder='password'></input>
                <button type='submit'>Login</button>
            </form>
        );
    }
}

export default Login;
