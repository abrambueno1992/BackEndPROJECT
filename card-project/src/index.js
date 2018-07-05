import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Home from './ucomponents/Home'
import { notesReducer } from './reducers/reducers';
import CreateUser from './ucomponents/CreateUser';
import Login from './ucomponents/Login';
import Fetch from './ucomponents/Fetch';
import CreateNote from './ucomponents/CreateNote';
import UpdateNote from './ucomponents/UpdateNote';
import UpdateUser from './ucomponents/UpdateUser';
import 'bootstrap/dist/css/bootstrap.min.css';

import PresentationMain from './components/PresentationMain';
import PresentationView from './components/PresentationView';
import EditNote from './components/EditNote';
import CreateNew from './components/CreateNew';
import LambdaSide from './components/LambdaSide';
import './App.css';


function LeftContent() {
	return (
		<div className="LeftContent">
			<LambdaSide />
		</div>
	);
}

function RightContent(props) {

	return (
		<div className="RightContent">
			<PresentationMain />
		</div>
	);
}

function SplitPane(props) {
	return (
		<div className="SplitPane">
			<div className="SplitPane-left">{props.left}</div>
			<div className="SplitPane-right">{props.right}</div>
		</div>
	);
}
const NoteHome = (props) => {
	return <SplitPane left={<LeftContent />} right={<RightContent notes={props.notes} />} />;
};
const New = (props) => {
	return <SplitPane left={<LambdaNewL />} right={<LambdaNewR />} />;
};
const View = (props) => {
	let id = props.match.params.id;
	return (
		<div style={{ height: '100%' }}>
			<SplitPane left={<LambdaNewL />} right={<ViewRight id={id} />} />
		</div>
	);
};
export const Edit = (props) => {
	let idE = props.match.params.idE;
	return (
		<div style={{ height: '100%' }}>
			<SplitPane left={<LambdaNewL />} right={<EditRight idE={idE} />} />
		</div>
	);
};
const Delete = (props) => {
	let id = props.match.params.id;

	return (
		<div style={{ height: '100%' }}>
			<SplitPane left={<LambdaNewL />} right={<ViewRight id={id} />} />
		</div>
	);
};

const ViewRight = (props) => {
	return (
		<div className="RightContent">
			<PresentationView id={props.id} />
		</div>
	);
};
const EditRight = (props) => {
	return (
		<div className="RightContent">
			<EditNote idE={props.idE} />
		</div>
	);
};

const LambdaNewL = (props) => {
	return (
		<div className="LeftContent">
			<LambdaSide />
		</div>
	);
};
const LambdaNewR = (props) => {
	return (
		<div className="RightContent">
			<CreateNew />
		</div>
	);
};

const store = createStore(notesReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));
const RouTING = () => {
	// if (this.props.history.push('/'))
	return (

		<div>
			<Route path="/" exact component={withRouter(Home)} />
			<Route path="/usercreate" exact component={withRouter(CreateUser)} />
			<Route path="/login" exact component={withRouter(Login)} />
			<Route path="/fetch" exact component={withRouter(Fetch)} />
			<Route path="/create" exact component={withRouter(CreateNote)} />
			<Route path="/update" exact component={withRouter(UpdateNote)} />
			<Route path="/userupdate" exact component={withRouter(UpdateUser)} />
			<Route path="/notes" exact component={withRouter(NoteHome)} />
			<Route exact path="/notes/new" component={withRouter(New)} />
			<Route exact path="/notes/view/:id" component={withRouter(View)} />
			<Route exact path="/notes/edit/:idE" component={withRouter(Edit)} />
			<Route exact path="/notes/view/delete/:idE" component={withRouter(Delete)} />
		</div>);
}


ReactDOM.render(

	<Provider store={store}>
		<Router>
			<RouTING />
		</Router>
	</Provider>,
	document.getElementById('root')
);
