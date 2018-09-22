import React from 'react';
import ModalComponent from './ModalComponent';
import { logoutAction, reorderState, getNotesAction } from '../actions/actions';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
const icSt = {
    display: 'inline-flex',
    backgroundColor: 'white',
    width: '22%',
    marginLeft: '3%',
    marginRight: '3%',
    border: '1px solid gray',
    padding: 10,
    height: 200,
    cursor: 'pointer',
    marginTop: 10,
    marginBottom: 10,
    overflow: 'hidden'
};
const hSt = {
    fontWeight: 'bold',
    marginLeft: '3%',
    // marginTop: 10,
    display: 'inline',
    
};
const userExpire = {
    // textDecoration: 'underline overline',
    color:'orange'
}

const ntSt = {
    display: 'inline-flex',
    width: '100%',
    paddingBottom: 8,
    fontWeight: 'bold',
    fontSize: 20
};



const noteStyle = {

    margin: 10

};
const desBtn = {
    color: 'black',
    fontWeight: 'bold',
    // marginTop: 10,
};
const desBtn2 = {
    cursor: 'pointer',
    padding: 2,
    fontWeight: 'bold',
    marginLeft: '3%',
    marginTop: 10,
};
const desBtn3 = {
    cursor: 'pointer',
    padding: 2,
    fontWeight: 'bold',
    marginLeft: '3%',
    // marginTop: 10,
};
const stybox = {
    marginLeft: '57%',
    width: '30%',
    // position: 'absolute',
    marginTop: '0%'
}
const desBtnLogout = {
    padding: 2,
    cursor: 'pointer',
    fontWeight: 'bold',
    marginLeft: 0,
    // color: 'red',
    // marginBottom: 2,
    width: '50%'
};
const usrBtn = {
    cursor: 'pointer',
    fontWeight: 'bold',
    // width: '30%'
    // color: 'red',
}
const hide = {
    display: 'none'
};
let dcolor = 'red';
let dcomplete = 'NOT COMPLETE';
let changeOrder = 'Descending';
let originalNotes;
class Presentation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            list: this.props.ndata,
            tag: '',
            reload: 0,
            showAscending: true,
            orderTag: false,
            rerender: 0,
            autheticated: 'Authenticated, Access Granted',
        };
    }



    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleTag = (tname, index) => {
        this.setState({ tag: tname });
        this.props.addTag({ tag: tname }, index);
    };

    dynamicSort = (property) => {
        var sortOrder = 1;
        if (property[0] === '-') {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
            return result * sortOrder;
        };
    };
    handleOrder = () => {
        let noteData = this.props.ndata
        let norder;
        if (this.state.showAscending === true) {
            norder = noteData.slice(0).reverse().map((note, i) => {
                return note;
            });
            this.setState({
                showAscending: !this.state.showAscending
            });
            this.setState({
                list: norder
            });
            this.props.reorderState(norder);
            this.setState({
                list: norder
            });
        } else {
            norder = noteData.slice(0).reverse().map((note, i) => {
                return note;
            });
            this.setState({
                showAscending: !this.state.showAscending
            });
            this.props.reorderState(norder);
            this.setState({
                list: norder
            });
        }

    };
    handleTag = () => {
        let notedata = this.props.ndata
        if (this.state.orderTag === false) {
            originalNotes = notedata.map((note) => {
                return note;
            });
            this.setState({
                orderTag: !this.state.orderTag
            });

            let tagArr = notedata.sort(this.dynamicSort('tag'));
            this.setState({
                list: tagArr
            });
            this.props.reorderState(tagArr);
        } else {
            this.setState({
                orderTag: !this.state.orderTag
            });
            this.setState({
                list: originalNotes
            });
            this.props.reorderState(originalNotes);
        }
    };
    handSignout = () => {
        this.props.logoutAction(this.props.history)
    };
    callNotes = () => {
        this.props.getNotesAction(this.props.history)
    }
    render() {
        if (!this.props.notes) {
            return (
                <div>
                    <h1>Loading</h1>
                </div>
            )
        }
        return (
            <div>
                <div style={hide}>

                    {this.state.showAscending === true ? (changeOrder = 'DESCENDING') : (changeOrder = 'ASCENDING')}
                </div>
                <div >
                    <h4 style={hSt}>Your Notes: <span style={userExpire}> {localStorage.getItem('username')}</span>  </h4>
                    <div>
                        <h4 style={hSt}>Expiration: <span style={userExpire}>{localStorage.getItem('expiration')}</span>  </h4>

                    </div>
                    <div style={stybox}>
                        <span>
                            <h6 style={desBtn}>
                                <Button color="danger" style={desBtnLogout} onClick={this.handSignout}>Logout</Button>{' '}
                            </h6>
                        </span>
                        <span>
                            <Link to="/userupdate">
                            <h6 style={usrBtn}>
                            <Button color="secondary" style={usrBtn}>Edit User Credentials</Button>{' '}
                            
                            </h6>
                            </Link>
                        </span>
                        <span>
                            <h6 style={desBtn}>
                                <span style={userExpire}>Change Order</span>
                                
                                <Button color="primary" style={desBtn2} onClick={this.handleOrder}>{changeOrder}</Button>{' '}
                            </h6>
                        </span>
                        <span>
                            <h6 style={desBtn}>
                            <span style={userExpire}> Order by Tag</span>

                                
                            <Button color="primary" style={desBtn3} onClick={this.handleTag}>Enable/Disable</Button>{' '}
                            </h6>
                        </span>
                    </div>
                </div>
                {this.state.showAscending ? (
                    <div>
                        {this.props.ndata.map((note, i) => {
                            {
                                note.check[0] === false ? (dcolor = 'red') : (dcolor = 'blue');
                            }
                            {
                                note.check[0] === false ? (dcomplete = 'NOT COMPLETE') : (dcomplete = 'COMPLETED');
                            }
                            return (
                                <Link to={`/notes/view/${i}`} style={icSt} key={note + i}>
                                    {' '}
                                    <h6>
                                        <span style={ntSt}>
                                            {' '}
                                            <span style={{ color: dcolor }}>
                                                {note.title} {`  `}
                                            </span>
                                        </span>
                                        <ModalComponent index={i} color={dcolor} callNotes={() => this.callNotes()} />
                                        <div style={noteStyle}>
                                            <span style={{ color: dcolor }}>{note.note}</span>
                                        </div>
                                    </h6>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                        <div>
                            {this.props.ndata.map((note, i) => {
                                {
                                    note.check[0] === false ? (dcolor = 'red') : (dcolor = 'blue');
                                }
                                {
                                    note.check[0] === false ? (dcomplete = 'NOT COMPLETE') : (dcomplete = 'COMPLETED');
                                }
                                return (
                                    <Link to={`/notes/view/${i}`} style={icSt} key={note + i}>
                                        {' '}
                                        <h6>
                                            <span style={ntSt}>
                                                {' '}
                                                <span style={{ color: dcolor }}>
                                                    {note.title} {`  `}
                                                </span>
                                            </span>
                                            <ModalComponent index={i} color={dcolor} callNotes={() => this.callNotes()} />
                                            <div style={noteStyle}>
                                                <span style={{ color: dcolor }}>{note.note}</span>
                                            </div>
                                        </h6>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
            </div>
        )
    }
}

const mapDispatchToProps = (state) => {
    return {
        notes: state.notes,
    };
};
// export default Presentation;

export default withRouter(connect(mapDispatchToProps, { logoutAction, getNotesAction, reorderState })(Presentation));
