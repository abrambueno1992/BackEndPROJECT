import React from 'react';
import { updateUser, deleteNote, getNotesAction, deleteUser } from '../actions/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
const mainStyle = {
    textAlign: 'center',
};
const btnStyle = {
    marginTop: 20,
    cursor: 'pointer',
};
const btnStyleDELete = {
    marginTop: 20,
    color: 'red',
    fontWeight: 'bold',
    backgroundColor: 'yellow',
    padding: 10,
    cursor: 'wait'
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
            IDlist: [],
            deleteConfirm: 0,
            delmessage: "Delete User",
            sentConfirm: false,
            sentFailedMessage: ''
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
        if (this.state.sentConfirm === true && nextProps.updateCheck === true) {
                this.setState({sentConfirm : false});
                this.props.history.push('/notes')
            
        }
        if (this.state.sentConfirm === true && this.props.updateCheck === false) { 
            this.setState({sentFailedMessage: "Update failed because the username has already been taken, please try a different username"})

            this.setState({sentConfirm : false});
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
        this.setState({ sentConfirm: true });
        this.props.updateUser(this.state, this.props.history);

    };
    handleDelete = () => {
        if (this.state.deleteConfirm > 0) {
            let lengthA = this.state.IDlist.length;
            for (let i = 0; lengthA > i; i++) {
                let IDnote = {
                    'Id': this.state.IDlist[i]
                }
                this.props.deleteNote(IDnote, this.props.history);
            }

            this.props.deleteUser(this.props.history)

        } else {
            this.setState({ deleteConfirm: 1, delmessage: "Confirm Deletion of User and all Notes" });
        }
    }
    render() {
        return (
            <div style={mainStyle}>
                <h1>UpdateUser component </h1>
                {this.state.message === '' ? <div></div> : <h3>{this.state.message}</h3>}
                {(this.props.updateCheck === false && this.state.sentConfirm === true) ? <div> <h3>Update failed because the username has already been taken, please try a different username</h3><h4> For Security You'll need to log in, again.</h4> <Link to='/login'><button>Login</button></Link> </div>:<div></div>  }
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
                <div >
                    <button style={btnStyle} onClick={this.checkCredentials}>Submit</button>
                </div>
                <div >
                    <Link to="/notes">
                        <button style={btnStyle}>Return to Notes</button>
                    </Link>
                </div>
                <div >
                    <button style={btnStyleDELete} onClick={this.handleDelete}>{this.state.delmessage}</button>
                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        user: state.user,
        notes: state.notes,
        updateReceived: state.updateReceived,
        updateCheck: state.updateCheck,
        error: state.error

    }
};

export default connect(mapStateToProps, { updateUser, getNotesAction, deleteNote, deleteUser })(UpdateUser)