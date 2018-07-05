import React from 'react';
import ModalComponent from './ModalComponent';
import { logoutAction, reorderState, getNotesAction } from '../actions/actions';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'

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
    marginTop: 10,
    display: 'inline-flex'
};

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
    // marginRight: 0
    // padding: 5,
    // cursor: 'pointer'
    fontWeight: 'bold',
    marginLeft: '60%',
    marginTop: 10,
    // display: 'inline-flex'
};
const desBtn2 = {
    // marginLeft: '3%',
    cursor: 'pointer',
    padding: 5,
    // cursor: 'pointer'
    fontWeight: 'bold',
    marginLeft: '7%',
    marginTop: 10,
    display: 'inline-flex'
};
const desBtn3 = {
    // marginLeft: '4%',
    cursor: 'pointer',
    padding: 5,
    // cursor: 'pointer'
    fontWeight: 'bold',
    marginLeft: '7%',
    marginTop: 10,
    display: 'inline-flex'
};
const desBtnLogout = {
    // marginLeft: '32%',
    padding: 5,
    cursor: 'pointer',
    fontWeight: 'bold',
    color: 'red',
    marginLeft: '38%',
    // marginTop: 10,
    marginBottom: 10,
    display: 'inline-flex'
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
    handleOrder = (noteData) => {
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
    handleTag = (notedata) => {

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
        return (
            <div>
                <div style={hide}>

                    {this.state.showAscending === true ? (changeOrder = 'DESCENDING') : (changeOrder = 'ASCENDING')}
                </div>
                <div>
                    <h4 style={hSt}>Your Notes: {localStorage.getItem('username')} </h4>
                    <span>
                        <h5 style={desBtn}>
                            <button style={desBtnLogout} onClick={this.handSignout}>
                                Logout
							</button>
                        </h5>
                    </span>
                    <span>
                        <h5 style={desBtn}>
                            Change Order
							<button style={desBtn2} onClick={() => this.handleOrder(this.props.ndata)}>
                                {changeOrder}
                            </button>
                        </h5>
                    </span>
                    <span>
                        <h5 style={desBtn}>
                            Order by Tag
							<button style={desBtn3} onClick={() => this.handleTag(this.props.ndata)}>
                                Enable/Disable
							</button>
                        </h5>
                    </span>
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
        notes: state.notes
    };
};
// export default Presentation;

export default withRouter(connect(mapDispatchToProps, { logoutAction, getNotesAction, reorderState })(Presentation));
