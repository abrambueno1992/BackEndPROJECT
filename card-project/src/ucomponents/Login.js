import React from 'react';
import { connect } from "react-redux";
import {loginAction}  from '../actions/actions'
const mainStyle = {
    textAlign: 'center',
}
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    };
    handleInput = e => {
        e.preventDefault()
        const { name, value } = e.target;;
        // console.log('username, password', name, value)
        this.setState({ [name]: value })
    };
    handleSubmit = () => {
        this.props.loginAction(this.state, this.props.history)
    }
    render() {
        return (
            <div style={mainStyle}>
                <h1>Welcome to the Login Component</h1>
                <input
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInput}

                />
                <input
                    type="password"
                    value={this.state.password}
                    name="password"
                    placeholder="Enter password"
                    onChange={this.handleInput}
                />
                <div>
                    <button onClick={this.handleSubmit}>Login </button>
                </div>
            </div>
        )
    }
};
const mapStateToProps = state => {
    user: state.user
}
// export default Login
export default connect(mapStateToProps, {loginAction})(Login)