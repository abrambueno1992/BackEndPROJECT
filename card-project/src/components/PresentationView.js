import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

import { deleteNote, updateNote, getNotesAction } from '../actions/actions';
import { connect } from 'react-redux';

const bStylec = {
	marginTop: 20,
	width: '40%',
	backgroundColor: '#25b8bd',
	cursor: 'pointer',
	color: 'white',
	height: 50,
	fontWeight: 'bold',
	fontSize: 20,
	marginLeft: '8%',
	marginRight: '10%'
};
const bStyled = {
	marginTop: 20,
	width: '100%',
	paddingRight: 60,
	paddingLeft: 60,
	backgroundColor: 'red',
	cursor: 'pointer',
	color: 'white',
	height: 50,
	fontWeight: 'bold',
	fontSize: 20,
	marginLeft: '15%',
	marginRight: '30%'
};
const warning = {
	textAlign: 'center'
};
const noteSt = {
	padding: 30
};
const linkSte = {
	justifyContent: 'center',
	marginLeft: '87%',
	marginRight: '2%',
	textAlign: 'center'
};
const notePadd = {
	marginTop: 40
}

const hide = {
	display: 'none'
};
const inpSt = {
	width: 50,
	height: 50
}
const lst = {
	fontSize: 24
}
let noteI = [];
let titleI = [];
let dcheck;
let dcolor = 'red';
let dcomplete = 'NOT COMPLETE';
class PresentationView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			list: [],
			checked: true,
			Complete: 'NOT COMPLETE',
			ccolor: 'red',
			notes: [],
			original: [],
		};
		// this.toggle = this.toggle.bind(this);
	}
	componentWillUpdate = (nextProps) => {
		if (this.props.notes !== nextProps.notes) {
			// this.setState({notes: Object.assign({}, nextProps.notes)});
			this.setState({ notes: nextProps.notes });
		}
	}
	componentDidMount() {
		// this.props.history.push('/notes')
		// this.props.history.push(`/notes/view/${this.props.match.params.id}`)
		// this.refresh();
		// this.props.getNotesAction(this.props.history);
		// this.props.history.push('/notes')
		// this.props.history.push(`/notes/view/${this.props.match.params.id}`)
		if (!this.props.notes) {
			this.props.getNotesAction(this.props.history)
		this.setState({ list: this.props.notes })

		}
	}
	refresh = () => {
		this.props.notes;
		// this.forceUpdate()
	};

	toggle = (e) => {
		e.preventDefault();
		this.setState({
			modal: !this.state.modal
		});
	}
	handleDelete = (id) => {
		let IDnote = {
			'Id': id
		}
		this.props.deleteNote(IDnote, this.props.history);
		noteI = [];
		titleI = [];
		this.refresh();
		this.setState({
			modal: !this.state.modal
		});
		this.props.history.push('/notes')
	};
	handleInputChange = (checkBoolean, id) => {
		// event.preventDefault();
		let trueObj = {
			'check': true,
			'Id': id
		};
		let falseObj = {
			'check': false,
			'Id': id
		}
		// this.setState({checked: this.state.checked === false ? true : false});
		// this.setState({ccolor: this.state.ccolor === 'red' ? 'blue' : 'red' });
		checkBoolean === false ? this.props.updateNote(trueObj, this.props.history) : this.props.updateNote(falseObj, this.props.history);
		// this.setState({Complete: this.state.Complete === 'NOT COMPLETE' ? 'COMPLETED' : 'NOT COMPLETE'});
		// this.props.getNotesAction();
		this.props.history.push('/notes')
		// this.props.checkUpdate(this.state.checked, this.props.id);
		// window.location.reload() 


	}

	render() {
		noteI = [];
		titleI = [];
		dcheck = [];
		dcomplete = '';
		if (this.props.notes === null) {
			return (
				<div>
					<h3>Loading</h3>
				</div>
			)
		}
		if (this.state.notes !== []) {
			return (
				<div>
					<div>
						<Link to={`/notes/edit/${this.props.id}`} style={linkSte}>
							<span style={lst} >edit</span>
						</Link>

						<Link to={`#`} onClick={this.toggle} >
							<span style={lst} >delete</span>
						</Link>

						{this.props.notes.map((note, i) => {
							return (
								<div style={hide} key={note + i}>
									{noteI.push(note.note)}
									{titleI.push(note.title)}
									{dcheck.push(note.check)}
								</div>
							);
						})}
						<div style={hide}>
							{dcheck[this.props.match.params.id][0] === false ? dcolor = 'red' : dcolor = 'blue'};
						{dcheck[this.props.match.params.id][0] === false ? dcomplete = 'NOT COMPLETE' : dcomplete = 'COMPLETED'};
						</div>
						<div style={noteSt}>
							<h1>{titleI[this.props.match.params.id]}</h1>
							<h4>Complete Status: <span style={{ color: dcolor }}> {dcomplete} </span> </h4>
							<input
								name="checkedB"
								type="checkbox"
								checked={dcheck[this.props.match.params.id][0]}
								onChange={() => this.handleInputChange(this.props.notes[this.props.match.params.id].check[0], this.props.notes[this.props.match.params.id]._id)}
								style={inpSt}
							/>
							<div style={notePadd} >
								<h2>{noteI[this.props.match.params.id]}</h2>
							</div>
							<label>

							</label>
						</div>
					</div>

					<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
						<ModalBody style={warning}>Are you sure you want to delete this?</ModalBody>
						<ModalFooter>
							<Link to={`/`} onClick={() => this.handleDelete(this.props.notes[this.props.id]._id)}>
								<Button color="primary" style={bStyled} onClick={() => this.handleDelete(this.props.notes[this.props.id]._id)}>
									Delete
								</Button>
							</Link>
							<Button color="secondary" onClick={this.toggle} style={bStylec}>
								No
							</Button>
						</ModalFooter>
					</Modal>
				</div>
			);

		}// else 

	}
}
const mapDispatchToProps = (state, ownProps) => {

	return {
		notes: state.notes
	};
};
export default withRouter(connect(mapDispatchToProps, { deleteNote, updateNote, getNotesAction })(PresentationView));
