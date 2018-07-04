import React from 'react';
import ModalComponent from './ModalComponent';
import { logoutAction, reorderState, getNotesAction } from '../actions/actions';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import Presentation from './Presentation';


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
const mainSt = {
	marginLeft: '2%',
	paddingTop: 50
};
const ntSt = {
	display: 'inline-flex',
	width: '100%',
	paddingBottom: 8,
	fontWeight: 'bold',
	fontSize: 20
};
const tagSt = {
	cursor: 'context-menu',
	marginLeft: 20,
	paddingLeft: 10,
	paddingRight: 10,
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
const noteStyle = {
	
	margin: 10
	
};
const desBtn = {
	marginLeft: '54%',
	color: 'black',
	fontWeight: 'bold',

	marginRight: 0
};
const desBtn2 = {
	marginLeft: '3%',
	cursor: 'pointer'
};
const desBtn3 = {
	marginLeft: '4%',
	cursor: 'pointer'
};
let tempVal;
const hide = {
	display: 'none'
};
let dcolor = 'red';
let dcomplete = 'NOT COMPLETE';
let changeOrder = 'Descending';
let originalNotes;
export class PresentationMain extends React.Component {
	constructor(props) {
		super(props);
		
	}
	componentWillUpdate = (nextProps) => {
	  if (this.props.notes.id != nextProps.notes.id) {
		  this.setState({notes: Object.assign({}, nextProps.notes)});
	  }
	}
	
	componentWillMount = () => {
		this.props.getNotesAction(this.props.history)
		
	}

	
	componentDidMount() {
		if (localStorage.getItem('token') !== null && localStorage.getItem('ID') !== null) {
			
				this.setState({list: this.props.notes})
		} else {
			this.setState({ autheticated: 'Not authenticated, Access Denied' });
			this.props.history.push('/')
		}

	}


	
	
	render() {
		let tempVal;
	
		let descI = this.props.notes.length;
		return (
			<div style={mainSt}>
				
				<Presentation ndata={this.props.notes} />
			
			</div>
		);
	}
}
const mapDispatchToProps = (state) => {
	return {
		notes: state.notes
	};
};

export default withRouter(connect(mapDispatchToProps, { logoutAction, getNotesAction, reorderState })(PresentationMain));
