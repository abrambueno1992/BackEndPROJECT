import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Home from './ucomponents/Home'
import { notesReducer } from './reducers/reducers';
import Routes from './ucomponents/Routes';
import CreateUser from './ucomponents/CreateUser';
import Login from './ucomponents/Login';
import Fetch from './ucomponents/Fetch';
import CreateNote from './ucomponents/CreateNote';
import UpdateNote from './ucomponents/UpdateNote';
import UpdateUser from './ucomponents/UpdateUser';
const store = createStore(notesReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));
const RouTING = () => {
	return (
		<div>
			<Route path="/" exact component={withRouter(Home)} />
			<Route path="/usercreate" exact component={withRouter(CreateUser)} />
			<Route path="/login" exact component={withRouter(Login)} />
			<Route path="/fetch" exact component={withRouter(Fetch)} />
			<Route path="/create" exact component={withRouter(CreateNote)} />
			<Route path="/update" exact component={withRouter(UpdateNote)} />
			<Route path="/userupdate" exact component={withRouter(UpdateUser)} />
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
