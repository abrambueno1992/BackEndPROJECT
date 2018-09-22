import React from 'react';
import { Link} from 'react-router-dom';
import NoteIMG from '../Screenshot from 2018-09-21 20-16-43.png'
import { Button } from 'reactstrap';
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
                        {/* <button>Log In</button> */}
                        <Button color="primary">Log In</Button>{' '}
                    </Link>
                </div>
                <div>
                    <h3>New User ?</h3>
                    <Link to="/usercreate" >
                        {/* <button>Create User</button> */}
                        <Button color="primary">Create User</Button>{' '}
                    </Link >
                </div>
                <div>
                </div>
                <h3 style={{marginTop: '3%', color: 'orange'}}>Application Preview</h3>
                <img src={NoteIMG} style={{height: '80%', width:'80%'}} />

            </div>
        )
    }

}
export default Home