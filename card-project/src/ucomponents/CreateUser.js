import React from 'react';
import { createUserAction, getNotesAction } from '../actions/actions';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
const mainStyle = {
    textAlign: 'center',
    width: '50%',
    marginLeft: '25%',
}
class CreateUser extends React.Component {
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
        }

    };
    componentDidMount = () => {
        //   this.props.getNotesAction(this.props.history);
    }

    componentWillUpdate = (nextProps) => {
        if (this.state.sentConfirm === true) {

            console.log("Props for check update", this.props.updateCheck, nextProps.updateCheck);
            console.log("message and sentconfirm", this.state.message, this.state.sentConfirm);
        }
        if (this.state.sentConfirm === true && nextProps.updateCheck === true) {
            console.log("Redirect")
            this.setState({ sentConfirm: false });
            this.props.history.push('/login')

        }
        if (this.state.sentConfirm === true && this.props.updateCheck === false) {
            this.setState({ sentFailedMessage: "Update failed because the username has already been taken, please try a different username" })

            this.setState({ sentConfirm: false });
        }
    }
    newCredentials = () => {
        let username = this.state.username;
        let password = this.state.password;
        const newObject = {
            username: username.toLowerCase().toString(),
            password: password
        };
        this.setState({ username: '', usernameconfirm: '', password: '', passwordconfirm: '' });
        this.setState({ sentConfirm: true });
        this.props.createUserAction(newObject, this.props.history);
        // this.props.history.push('/login');
    }
    checkCredentials = () => {
        if (this.state.password === this.state.passwordconfirm && this.state.username === this.state.usernameconfirm && this.state.username !== '' && this.state.password !== '') {
            this.newCredentials();
        } else {
            this.setState({ username: '', password: '', passwordconfirm: '', username: '', usernameconfirm: '', message: "Update Failed, due to mismatch password or username, try again" });
        }
    }
    handleInput = (e) => {
        e.preventDefault();
        // let valued = e.targe.value;
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    render() {

        return (
            <div style={mainStyle}  >
                <div >
                <h3>Please Register an Account</h3>

                </div>
                {this.state.message === '' ? <div></div> : <h3>{this.state.message}</h3>}
                {(this.props.updateCheck === false && this.state.sentConfirm === true) ? <div> <h3>Update failed because the username has already been taken, please try a different username</h3> </div> : <div></div>}
                

                <Form>
                    <FormGroup>
                        <Label for="exampleText">Username</Label>
                        <Input 
                        type="text" 
                        name="username" 
                        value={this.state.username}
                        id="exampleText" 
                        placeholder="Enter new username" 
                        onChange={this.handleInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText2">Confirm Username</Label>
                        <Input 
                        type="text" 
                        name="usernameconfirm"
                        value={this.state.usernameconfirm}
                        id="exampleText2" 
                        placeholder="Confirm new username" 
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
                    <FormGroup>
                        <Label for="examplePassword2">Password</Label>
                        <Input 
                        type="password" 
                        value={this.state.password}
                        id="examplePassword2" 
                        name="passwordconfirm"
                        placeholder="Confirm Password"
                        value={this.state.passwordconfirm}
                        onChange={this.handleInput}
                        />
                    </FormGroup>
          
                    {/* <Button onClick={this.checkCredentials}>Submit</Button> */}
                </Form>
                <div style={{textAlign: 'center'}}>

                    <Button onClick={this.checkCredentials} color="primary">Submit</Button>{' '}
                   
                </div>
            </div>
        )
    }
    // }

}
const mapStateToProps = state => {
    return {
        user: state.user,
        // notes: state.notes,
        updateReceived: state.updateReceived,
        updateCheck: state.updateCheck,
        error: state.error
    }
}

// export default CreateUser
export default connect(mapStateToProps, { createUserAction, getNotesAction })(CreateUser)