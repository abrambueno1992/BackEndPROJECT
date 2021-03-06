import { CREATE_NOTE, REORDER_STATE, CREATE_USER, LOGOUT_ACTION, LOGIN_ACTION, GET_NOTES_ACTION, UPDATE_NOTE, UPDATE_USER, DELETE_NOTE, DELETE_USER, ERRORS } from '../actions/actions'

const startState = {
	notes: null,
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
				notes: null,
				createdNotes: [],
			}));
		case GET_NOTES_ACTION:
			return (Object.assign({}, state, {
				notes: action.payload,
				updateCheck: false,
			}));
		case UPDATE_NOTE:
			return (Object.assign({}, state, {
				updatednotes: action.payload,
				updatStatus: action.updatStatus,
				
				notes: null,
			}));
		case UPDATE_USER:
			return (Object.assign({}, state, {
				updateCheck: true,
				updateReceived: action.payload,
				user: []
			}));
		case DELETE_NOTE:
			return (Object.assign({}, state, {
				notes: null
			}));
		case DELETE_USER:
			return (Object.assign({}, state, {
				user: []
			}));
		case ERRORS:
			return (
				Object.assign({}, state, {
				error: action.payload
					
				})
			);
		case CREATE_NOTE:
			return (Object.assign({}, state, {
				createdNotes: action.payload,
				createNoteStatus: action.createNoteStatus,
				notes: null
			}));

		default:
			return state;


	}
};
