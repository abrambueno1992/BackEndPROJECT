import React from 'react';
import { updateUser, deleteUser } from '../actions/actions';
import { connect } from 'react-redux';

class UpdateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordconfirm: ''
        };
    }
    componentDidMount = () => {

    };
    handleInput = e => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log('name,value:', name + ' ' + value)
        this.setState({ [name]: value })
    };
    checkCredentials = () => {

        if (this.state.password === this.state.passwordconfirm && this.state.password !== '') {
            this.handleSubmit();
        } else {
            this.setState({ username: '', password: '', passwordconfirm: ''});
        }
    }
    handleSubmit = () => {
        this.props.updateUser(this.state, this.props.history)
    };
    handleDelete = () => {
        this.props.deleteUser(this.props.history)
        //Make sure this.state is replaced with the ID of the note
    }
    render() {
        return (
            <div>
                <h1>UpdateUser component </h1>
                <input
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInput}
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    name="password"
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
                <div>
                    <button onClick={this.checkCredentials}>Submit</button>
                </div>
                <div>
                    <button onClick={this.handleDelete}>Delete User</button>
                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        user: state.user

    }
};

export default connect(mapStateToProps, { updateUser, deleteUser })(UpdateUser)