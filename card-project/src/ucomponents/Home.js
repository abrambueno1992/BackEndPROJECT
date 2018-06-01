import React from 'react';
import { Link, Route } from 'react-router-dom';
import CreateUser from './CreateUser'
const mainStyle = {
    textAlign: 'center',
}
class Home extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount = () => {
        if (window.localStorage.getItem('token') !== null) { 
            this.props.history.push('/notes')
        }
    }
    render() {
        return (
            <div style={mainStyle}>
            
                <href />
                <h1>Welcome to Lambda Notes </h1>
                <h3>New User ?</h3>
                <Link to="/usercreate" >
                    <button>Create User</button>
                </Link >
                <div>
                <h3>Returning User ?</h3>
                <Link to="/login" >
                    <button>Log In</button>
                </Link>
                </div>

            </div>
        )
    }

}
export default Home