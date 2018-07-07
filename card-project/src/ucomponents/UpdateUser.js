import React from 'react';
import { updateUser, deleteNote, getNotesAction, deleteUser } from '../actions/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
const mainStyle = {
    textAlign: 'center',
};
const btnStyle = {
    marginTop: 20
}
class UpdateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            usernameconfirm: '',
            password: '',
            passwordconfirm: '',
            message: '',
            noteList: [],
            IDlist: []
        };
    }
    componentDidMount = () => {
        this.props.getNotesAction(this.props.history)
    };
    componentWillUpdate = (nextProps) => {
        if (this.props.notes !== nextProps.notes) {
            let lengthA = nextProps.notes.length;
            let tArr = [];
            for (let i = 0; lengthA > i; i++) {
                let noteID = nextProps.notes[i]._id;
                tArr.push(noteID);
            }
            this.setState({ noteList: nextProps.notes, IDlist: tArr });

        }
    }
    handleInput = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value })
    };
    checkCredentials = () => {

        if (this.state.password === this.state.passwordconfirm && this.state.username === this.state.usernameconfirm && this.state.username !== '' && this.state.password !== '') {
            this.handleSubmit();
        } else {
            this.setState({ username: '', password: '', passwordconfirm: '', username: '', usernameconfirm: '', message: "Update Failed, due to mismatch password or username, try again" });
        }
    }
    handleSubmit = () => {
        this.props.updateUser(this.state, this.props.history);
        this.props.history.push('/notes')
    };
    handleDelete = () => {
        let lengthA = this.state.IDlist.length;
        for (let i = 0; lengthA > i; i++) {
            let IDnote = {
                'Id': this.state.IDlist[i]
            }
            this.props.deleteNote(IDnote, this.props.history);
        }

        this.props.deleteUser(this.props.history)
    }
    render() {
        return (
            <div style={mainStyle}>
                <h1>UpdateUser component </h1>
                {this.state.message === '' ? <div></div> : <h3>{this.state.message}</h3>}
                <form>
                    <input
                        type="text"
                        placeholder="Enter new username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInput}
                    />
                    <input
                        type="text"
                        placeholder="Confirm new username"
                        name="usernameconfirm"
                        value={this.state.usernameconfirm}
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
                </form>
                <div style={btnStyle}>
                    <button onClick={this.checkCredentials}>Submit</button>
                </div>
                <div style={btnStyle}>
                    <Link to="/notes">
                        <button>Return to Notes</button>
                    </Link>
                </div>
                <div style={btnStyle}>
                    <button onClick={this.handleDelete}>Delete User</button>
                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        user: state.user,
        notes: state.notes

    }
};

export default connect(mapStateToProps, { updateUser, getNotesAction, deleteNote, deleteUser })(UpdateUser)