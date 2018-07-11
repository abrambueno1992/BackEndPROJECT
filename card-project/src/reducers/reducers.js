import { CREATE_NOTE, REORDER_STATE, CREATE_USER, LOGOUT_ACTION, LOGIN_ACTION, GET_NOTES_ACTION, UPDATE_NOTE, UPDATE_USER, DELETE_NOTE, DELETE_USER, ERRORS } from '../actions/actions'

const startState = {
	notes: [],
	user: [],
	createdNotes: [],
	updatednotes: [],
	error: '',
	expiration: '',
	updateCheck: false,
	updateReceived: ''

};

export const notesReducer = (state = startState, action) => {
	switch (action.type) {
		case CREATE_USER:
			return (Object.assign({}, state, {
				user: { username: action.payload.data.username, ID: action.payload.data._id},
				updateCheck: true 
			}));
		case REORDER_STATE:
			return (Object.assign({}, state, {
				notes: [...action.payload]
			}));
		case LOGIN_ACTION:
			return (Object.assign({}, state, {
				user: { ...state.user, token: action.payload, username: action.username, ID: action.Id },
				expiration: action.expiration
			}));
		case LOGOUT_ACTION:
			return (Object.assign({}, state, {
				user: [],
				notes: [],
				createdNotes: [],
			}));
		case GET_NOTES_ACTION:
			return (Object.assign({}, state, {
				notes: action.payload,
				updateCheck: false
			}));
		case UPDATE_NOTE:
			return (Object.assign({}, state, {
				updatednotes: action.payload,
				
				notes: [],
			}));
		case UPDATE_USER:
			return (Object.assign({}, state, {
				updateCheck: true,
				updateReceived: action.payload,
				user: []
			}));
		case DELETE_NOTE:
			return (Object.assign({}, state, {
				notes: []
			}));
		case DELETE_USER:
			return (Object.assign({}, state, {
				user: []
			}));
		case ERRORS:
			return (
				Object.assign({}, state, {
					error: 'Error'
				})
			);
		case CREATE_NOTE:
			return (Object.assign({}, state, {
				createdNotes: action.payload
			}));

		default:
			return state;


	}
};
