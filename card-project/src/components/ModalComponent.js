import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { updateNote } from '../actions/actions';
import { connect } from 'react-redux';

import { Link, withRouter } from 'react-router-dom';

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
	marginTop: 10
};
const mainSt = {
	marginLeft: '2%',
	paddingTop: 50
};
const ntSt = {
	display: 'inline-flex',
	width: '100%',
	paddingBottom: 8,
	borderBottom: '1px solid gray'

};
let dval = 'beige';

let tagSt = {
	cursor: 'context-menu',
	color: 'black',
	backgroundColor: dval,
};
let tagSt2 = {
	cursor: 'crosshair',
	display: 'inline-flex',
	fontWeight: 'bold',
	fontSize: 18,
	marginLeft: 20,

	paddingLeft: 15,
	paddingRight: 15,
	backgroundColor: 'beige',
	border: '2px solid yellow'
};
const aprompt = {
	width: '400%',
	padding: 100
};
const iStyle = {
	marginTop: 10
};
let tempVal;
let linkStyle = {
	cursor: 'context-menu',
	display: 'inline-flex',
	color: 'black',

	paddingLeft: 2,
	paddingRight: 2,
	backgroundColor: 'beige',
	border: '2px solid yellow'
};
let dcolor = 'red';
let dcomplete = 'NOT COMPLETE';
class ModalComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			list: this.props.notes,
			tag: '',
			isGoing: true,
			hover: false
		};
	}
	componentDidMount() {
		this.forceUpdate()
		this.props.notes;
	}
	handleInputChange = (e) => {
		let name = e.target.name;
		this.setState({ [e.target.name]: e.target.value });


	};
	handleTag = (tname, index) => {
		this.setState({
			modal: !this.state.modal
		});
		let IDnote = this.props.notes[index]._id;
		this.setState({ tag: tname });
		let tagObject = {
			'tag': tname,
			'Id': IDnote
		}
		this.props.updateNote(tagObject, this.props.history);
		this.props.callNotes();


	};
	toggle = (e) => {
		e.preventDefault()
		this.setState({
			modal: !this.state.modal
		});

		if (this.state.hover) {
			dval = 'red';
		} else {
			(' ');
		}
		{
			dval = 'beige';
		}
	};
	render() {

		return (
			<div>

				<span style={ntSt}>
					<span style={{ color: dcolor }}>

						<button onClick={this.toggle} style={tagSt} >Tag:</button>

						<span style={tagSt2}>
							<span style={{ color: this.props.color }}> {this.props.notes[this.props.index].tag}</span>
						</span>
					</span>
				</span>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					<span style={{ fontWeight: 'bold', textAlign: 'center', fontWeight: 'bold' }}>Select Tag</span>{' '}

					<Button color="primary" style={hSt} onClick={() => this.handleTag('To-Do', `${this.props.index}`)}>
						To-Do
					</Button>
					<Button
						color="primary"
						style={hSt}
						onClick={() => this.handleTag('Backlog', `${this.props.index}`)}
					>
						Backlog
					</Button>
					<Button
						color="primary"
						style={hSt}
						onClick={() => this.handleTag('In Progress', `${this.props.index}`)}
					>
						In Progress
					</Button>
					<Button color="primary" style={hSt} onClick={() => this.handleTag('Done', `${this.props.index}`)}>
						Done
					</Button>
					<div>
						<label style={iStyle}>
							Or CUSTOM TAG:
							<input
								onChange={this.handleInputChange}
								placeholder="tag"
								value={this.state.tag}
								name="tag"
							/>
						</label>
						<Button
							style={{ marginLeft: 10 }}
							color="primary"
							onClick={() => this.handleTag(this.state.tag, `${this.props.index}`)}
						>
							Submit
						</Button>
					</div>
				</Modal>
			</div>
		);
	}
}
const mapDispatchToProps = (state) => {
	return {
		notes: state.notes
	};
};

export default withRouter(connect(mapDispatchToProps, { updateNote })(ModalComponent));
