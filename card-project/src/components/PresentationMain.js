import React from 'react';
import ModalComponent from './ModalComponent';
import { Link } from 'react-router-dom';
import { logoutAction,   reorderState, getNotesAction } from '../actions/actions';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

// const cStyle = {
// 	marginLeft: '10%',
// 	border: '2px solid red',
// 	display: 'flex'
// };

// const lStyle = {
// 	width: '20%',
// 	marginLeft: '1%',
// 	marginRight: '1%',
// 	display: 'inline-block',
// 	height: 1000,
// 	border: '2px solid red'
// };
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
	// borderBottom: '1px solid gray',
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
	// marginLeft: 60,
	marginTop: 10
};
const noteStyle = {
	// padding: 40,
	// marginLeft: 10,
	// marginRight: 10,
	margin: 10
	// border: '1px solid red',
	// fontSize: 10,
	// textAlign: 'center'
};
const desBtn = {
	marginLeft: '54%',
	color: 'black',
	fontWeight: 'bold',
	// border: '1px solid yellow',

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
		this.state = {
			modal: false,
			list: [],
			tag: '',
			reload: 0,
			showAscending: true,
			orderTag: false,
			autheticated: 'Authenticated, Access Granted',

		};
	}

	componentDidMount() {
		console.log('this is in storage', localStorage.getItem('token'))
        if (localStorage.getItem('token') !== null && localStorage.getItem('ID') !== null) {
			
			
			this.props.getNotesAction(this.props.history);
			this.callSet()
			
		} else {
			this.setState({ autheticated: 'Not authenticated, Access Denied' });
			this.props.history.push('/')
        }
		// this.props.notes;
		if (this.state.list.length === 0 || this.state.reload < 2) {
			this.setState({reload: this.state.reload + 1})
			// this.props.history.push('/notes')
		}
	}
	callSet= () => {
		// this.props.getNotesAction();
		if (this.state.list.length === 0) {
			// this.props.history.push('/notes')
			
		}
		this.setState({list: this.props.notes})
		
	}
	handleInputChange = (e) => {
		let name = e.target.name;
		this.setState({ [e.target.name]: e.target.value });

		console.log(e.target.name);
		console.log(e.target.value);
	};
	handleTag = (tname, index) => {
		this.setState({ tag: tname });
		this.props.addTag({ tag: tname }, index);
	};
	// toggle = () => {
	// 	this.setState({
	// 		modal: !this.state.modal
	// 	});
	// };
	dynamicSort = (property) => {
		var sortOrder = 1;
		if (property[0] === '-') {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function(a, b) {
			var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
			return result * sortOrder;
		};
	};
	handleOrder = () => {
		let norder;
		if (this.state.showAscending === true) {
			norder = this.state.list.slice(0).reverse().map((note, i) => {
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
			norder = this.state.list.slice(0).reverse().map((note, i) => {
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

		console.log('norder: ', norder);
	};
	handleTag = () => {
		// if (originalNotes === undefined) {
		// 	originalNotes = this.state.list.map((note) => {
		// 		return note;
		// 	});	
		// } 
		if (this.state.orderTag === false) {
			originalNotes = this.state.list.map((note) => {
				return note;
			});	
			this.setState({
				orderTag: !this.state.orderTag
			});
			// console.log('original notes value: ', originalNotes)			

			let tagArr = this.state.list.sort(this.dynamicSort('tag'));
			// console.log('New ARrray is: ', tagArr);
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
	}
	render() {
		let tempVal;
		console.log('notes length: ', this.props.notes.length);
		console.log('list is: ', this.state.list);
		let descI = this.props.notes.length;
		return (
			<div style={mainSt}>
				<div style={hide}>
				
					{this.state.showAscending === true ? (changeOrder = 'DESCENDING') : (changeOrder = 'ASCENDING')}
				</div>
				<div>
				<h5> {this.state.autheticated} </h5>
					<h4 style={hSt}>Your Notes:</h4>
					<span>
						<h5 style={desBtn}>
							{/* Order by Tag */}
							<button style={desBtn3} onClick={this.handSignout}>
								Logout
							</button>
						</h5>
					</span>
					<span>
						<h5 style={desBtn}>
							Change Order
							<button style={desBtn2} onClick={this.handleOrder}>
								{changeOrder}
							</button>
						</h5>
					</span>
					<span>
						<h5 style={desBtn}>
							Order by Tag
							<button style={desBtn3} onClick={this.handleTag}>
								Enable/Disable
							</button>
						</h5>
					</span>
				</div>

				{this.state.showAscending ? (
					<div>
						{this.state.list.map((note, i) => {
							{console.log('the check status is:', note.check)}
							tempVal = i;
							{
								note.check[0] === false ? (dcolor = 'red') : (dcolor = 'blue');
							}
							{
								note.check[0] === false ? (dcomplete = 'NOT COMPLETE') : (dcomplete = 'COMPLETED');
							}
							console.log('color: dcomplete:', dcolor, dcomplete);
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
										<ModalComponent index={i} color={dcolor} />
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
						{this.state.list.map((note, i) => {
							{console.log('the check status is:', note.check)}
							tempVal = i;
							{
								note.check[0] === false ? (dcolor = 'red') : (dcolor = 'blue');
							}
							{
								note.check[0] === false ? (dcomplete = 'NOT COMPLETE') : (dcomplete = 'COMPLETED');
							}
							console.log('color: dcomplete:', dcolor, dcomplete);
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
										<ModalComponent index={i} color={dcolor} />
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
		);
	}
}
const mapDispatchToProps = (state) => {
	return {
		notes: state.notes
	};
};

export default withRouter(connect(mapDispatchToProps, {logoutAction, getNotesAction,    reorderState })(PresentationMain));
