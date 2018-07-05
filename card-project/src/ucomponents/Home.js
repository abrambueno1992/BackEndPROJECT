import React from 'react';
import { Link} from 'react-router-dom';
const mainStyle = {
    textAlign: 'center',
}
const stlog = {
    marginBottom: 35,
    marginTop: 35
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

                <h1>Welcome to Lambda Notes </h1>
                <div style={stlog} >
                    <h3>Returning User, please login.</h3>
                    <Link to="/login" >
                        <button>Log In</button>
                    </Link>
                </div>
                <div>
                    <h3>New User ?</h3>
                    <Link to="/usercreate" >
                        <button>Create User</button>
                    </Link >
                </div>
                <div>
                </div>

            </div>
        )
    }

}
export default Home