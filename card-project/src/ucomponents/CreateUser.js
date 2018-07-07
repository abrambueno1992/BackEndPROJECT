import React from 'react';
import { createUserAction } from '../actions/actions';
import { connect } from 'react-redux';
const mainStyle = {
    textAlign: 'center',
}
class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordconfirm: '',
            sent: false
        }

    };

    newCredentials = () => {
        let username = this.state.username;
        let password = this.state.password;
        const newObject = {
            username: username.toLowerCase().toString(),
            password: password
        };
        this.props.createUserAction(newObject, this.props.history);
        this.props.history.push('/login');
    }
    checkCredentials = () => {
        this.setState({ sent: true });
        if (this.state.password === this.state.passwordconfirm && this.state.password !== '') {
            this.newCredentials();
        } else {
            this.setState({ username: '', password: '', passwordconfirm: '' });
        }
    }
    handleInput = (e) => {
        e.preventDefault();
        // let valued = e.targe.value;
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    render() {
        if (this.state.sent === false) {
            return (
                <div style={mainStyle} >
                    <h3>CreateUser Component</h3>
                    <form>
                        <input
                            type='text'
                            name="username"
                            placeholder="Enter Username"
                            value={this.state.username}
                            onChange={this.handleInput}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.handleInput}
                        />
                        <input
                            type="password"
                            name="passwordconfirm"
                            placeholder="Confirm Password"
                            value={this.state.passwordconfirm}
                            onChange={this.handleInput}
                        />
                    </form>
                    <div>

                        <button onClick={this.checkCredentials} >Submit </button>
                    </div>
                </div>
            )

        }
        if (this.state.sent === true && this.props.user.length === 0) {
            return (
                <div style={mainStyle} >
                    <h3>CreateUser Component</h3>
                    {this.props.user.length === 0 ? <h3>Passwords didn't match, try again</h3> : <h3> Password accepted</h3>}
                    <form>
                        <input
                            type='text'
                            name="username"
                            placeholder="Enter Username"
                            value={this.state.username}
                            onChange={this.handleInput}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.handleInput}
                        />
                        <input
                            type="password"
                            name="passwordconfirm"
                            placeholder="Confirm Password"
                            value={this.state.passwordconfirm}
                            onChange={this.handleInput}
                        />
                    </form>
                    <div>

                        {/* <Link to="/login"> */}
                        <button onClick={this.checkCredentials} >Submit </button>
                        {/* </Link > */}
                    </div>
                </div>
            )
        }
    }

}
const mapStateToProps = state => {
    return {

        user: state.user
    }
}

// export default CreateUser
export default connect(mapStateToProps, { createUserAction })(CreateUser)