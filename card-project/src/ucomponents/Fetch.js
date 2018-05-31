import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { getNotesAction, logoutAction } from '../actions/actions'
class Fetch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            autheticated: 'Authenticated, Access Granted'
        }
    };
    componentDidMount = () => {
        console.log('this is in storage', localStorage.getItem('token'))
        if (localStorage.getItem('token') !== null && localStorage.getItem('ID') !== null) {
            this.props.getNotesAction();


        } else {
            this.setState({ autheticated: 'Not authenticated, Access Denied' })
        }
        // console.log('fetch component, token:',window.localStorage.getItem('token'))
        // let ndata = window.localStorage.getItem('notes')
        // this.setState({notes: ndata})
    }
    handleFetch = () => {
        this.props.getNotesAction();
    }
    handleLogout = () => {
        this.props.logoutAction(this.props.history);
    }
    render() {
        console.log('The notes are:', this.props.notes)
        return (

            <div>
                <h1> {this.state.autheticated} </h1>
                <button onClick={this.handleFetch}>fetch data </button>
                <div>
                    <button onClick={this.handleLogout}>Logout </button>
                </div>
                <Link to="/create" >
                    <button> Create Note </button>
                </Link>
                <div>
                    <Link to="/update" >
                        <button>Update Note</button>
                    </Link>
                </div>
                <div>
                    <Link to="/userupdate" >
                        <button>Update User</button>
                    </Link>
                </div>
       
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {

        notes: state.notes
    }
};

export default connect(mapStateToProps, { getNotesAction, logoutAction })(Fetch)