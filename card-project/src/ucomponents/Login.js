import React from 'react';
import { connect } from "react-redux";
import { loginAction } from '../actions/actions'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
const mainStyle = {
    textAlign: 'center',
    width: '50%',

    marginLeft: '25%'


}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
            sent: false,
        }
    };
    handleInput = e => {
        e.preventDefault()
        const { name, value } = e.target;;
        this.setState({ [name]: value })
    };
    handleSubmit = () => {
        this.props.loginAction(this.state, this.props.history);
        this.setState({ sent: true });
        this.setState({ username: '', password: '' })
    }

    render() {
        if (this.state.sent === false) {
            return (
                <div style={mainStyle}>
                    <h1>Welcome Back</h1>
                    <Form>
                        <FormGroup>
                            <Label for="exampleText">Username</Label>
                            <Input
                                type="text"
                                name="username"
                                value={this.state.username}
                                id="exampleText"
                                placeholder="Enter username"
                                onChange={this.handleInput}
                            />

                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                value={this.state.password}
                                id="examplePassword"
                                placeholder="Enter password"
                                onChange={this.handleInput}
                            />
                        </FormGroup>
                    </Form>
                   
                    <div>
                        <Button color="primary" onClick={this.handleSubmit}>Login</Button>{' '}

                    </div>

                </div>
            )

        }
        if (this.props.error === 'No user with that username in notes DB') {
            return (
                <div style={mainStyle}>
                {this.props.user.length === 0 ? <h3>Credentials are invalid</h3> : <h1></h1>}
                <h1>Please, try again</h1>
                <Form>
                        <FormGroup>
                            <Label for="exampleText">Username</Label>
                            <Input
                                type="text"
                                name="username"
                                value={this.state.username}
                                id="exampleText"
                                placeholder="Enter username"
                                onChange={this.handleInput}
                            />

                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                value={this.state.password}
                                id="examplePassword"
                                placeholder="Enter password"
                                onChange={this.handleInput}
                            />
                        </FormGroup>
                    </Form>
                    <Button color="primary" onClick={this.handleSubmit}>Login</Button>{' '}
                </div>
            )
        }

        if ((this.state.sent === true && this.props.user.length === 0) || (this.state.sent === true && this.props.user.length !== 0)) {
            return (
                <div style={mainStyle}>
                    <h1>Loading</h1>
                </div>
            )
        }
    }
};
const mapStateToProps = state => {
    return {
        user: state.user,
        error: state.error
    };
}
export default connect(mapStateToProps, { loginAction })(Login)