import React from 'react';
import { Link } from 'react-router-dom';

const bStyle = {
	marginTop: 10,
	fontSize: 20,
	marginBottom: 10,
	backgroundColor: '#25b8bd',
	// backgroundColor: 'red',

	cursor: 'pointer',
	width: '85%',
	color: 'white',
	height: 50,
	fontWeight: 'bold'
};
const mSt = {
	marginLeft: '7.5%',
	// display: 'flex',
	// boxSizing: 'inherit',
	// width: '100%',
	// display: 'flex',
	// flexDirection: 'column',
	// border: '2px solid black',
	// justifyContent: 'flex-start',
	// alignItems: 'stretch',
	// height: '100%',

	// height: '2000px'
};
const hSt = {
	fontWeight: 'bold'
};
const LambdaSide = (props) => {
	return (
		<div style={mSt}>
			<div>
				<h1 style={hSt}>
					Lambda <br />Notes{' '}
				</h1>
			</div>
			<Link to="/notes">
				<button style={bStyle}>View Your Notes</button>
			</Link>
			<Link to="/notes/new">
				<button style={bStyle}>+ Create New Note</button>
			</Link>
		</div>
	);
};
export default LambdaSide;
