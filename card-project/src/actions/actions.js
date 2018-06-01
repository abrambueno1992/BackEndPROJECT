import axios from 'axios';
import qs from 'qs'
// export const ADD_NOTE = 'ADD_NOTE';
// export const DELETE_NOTE = 'DELETE_NOTE';
// export const UPDATE_NOTE = 'UPDATE_NOTE';
// export const CHECK_UPDATE = 'CHECK_UPDATE';
// export const ADD_TAG = 'ADD_TAG'
// export const REORDER_STATE = 'REORDER_STATE';
// let notes = [];
// let titles = [];

export const CREATE_USER = 'CREATE_USER';
export const CREATE_NOTE = 'CREATE_NOTE';
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const LOGOUT_ACTION = 'LOGOUT_ACTION'
export const GET_NOTES_ACTION = 'GET_NOTES_ACTION';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_NOTE = 'DELETE_NOTE';
export const DELETE_USER = 'DELETE_USER';
export const ERRORS = 'ERRORS';
export const REORDER_STATE = 'REORDER_STATE';

const ROOT_URL = "https://shielded-mountain-33568.herokuapp.com/api/notes/";

export const createUserAction = (obj, history) => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('notes');

    let username = obj.username;
    return (dispatch) => {
        axios.post(`${ROOT_URL}new`, obj)
            .then(resp => {
                localStorage.setItem('ID', resp.data._id);
                localStorage.setItem('username', resp.data.username);
                dispatch({
                    type: CREATE_USER,
                    username: username,
                    payload: resp
                });
                history.push('/login');
            })
    }
};

export const createNoteAction = (obj, history) => {
    const data = {
        'title': obj.title,
        'note': obj.note,
        'check': false,
        'tag': obj.tag,
        '_creator': localStorage.getItem('ID')
    }
    console.log('data in created noteAction:', data)
    return (dispatch) => {
        const token = localStorage.getItem('token');
        const optionTwo = {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'Authorization': token },
            data: data,
            url: `${ROOT_URL}create`,
        }
        axios(optionTwo)
            .then((resp) => {
                // localStorage.setItem('notes', resp)
                console.log('response of getNotes', resp.data)
                dispatch({
                    type: CREATE_NOTE,
                    payload: resp.data
                });
            })
            .catch(() => dispatch({ type: ERRORS }));
        history.push('/notes')
    }
}

export const loginAction = (obj, history) => {
    return (dispatch) => {
        axios.post(`${ROOT_URL}login`, obj)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', res.data.username);
                localStorage.setItem('ID', res.data.Id);
                dispatch({
                    type: LOGIN_ACTION,
                    payload: res.data.token,
                    username: res.data.username,
                    Id: res.data.Id
                });
                history.push('/notes')
            })
            .catch(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                dispatch({ type: ERRORS });
            });
    }
};
export const logoutAction = (history) => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('ID');
    localStorage.removeItem('notes');
    history.push('/');
    return {
        type: LOGOUT_ACTION
    };
}

export const getNotesAction = (history) => {
    console.log('getNotesAction, token:', localStorage.getItem('token'))
    const token = localStorage.getItem('token');
    return (dispatch) => {
        const data = {

            'Id': localStorage.getItem('ID')
        }

        const optionTwo = {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'Authorization': token },
            data: data,
            url: `${ROOT_URL}get`,
        }

        axios(optionTwo)
            .then((resp) => {
                localStorage.setItem('notes', resp.data)
                console.log('response of getNotes', resp)
                dispatch({
                    type: GET_NOTES_ACTION,
                    payload: resp.data
                })
                // history.push('/notes')
            })
            .catch(err => dispatch({ type: ERRORS }));
    }
};

export const updateNote = (obj, history) => {
    const token = localStorage.getItem('token');
    return (dispatch) => {
        const data = {
            'title': obj.title,
            'note': obj.note,
            'check': obj.check,
            'tag': obj.tag,
            'Id': '5b104d1826c49f0004eda91b'
            //localStorage.getItem('ID')
        };
        const options = {
            method: 'PUT',
            headers: { 'content-type': 'application/json', 'Authorization': token },
            data: obj,
            url: `${ROOT_URL}update`,
        }

        axios(options)
            .then(res => {

                dispatch({
                    type: UPDATE_NOTE,
                    payload: res.data
                });
            })
            .catch(err => dispatch({ type: ERRORS }));
        // history.push('/notes');
        // history.push('/');
        history.push( '/notes');
        // window.location.reload() 
    }
};

export const updateUser = (obj, history) => {
    const token = localStorage.getItem('token');
    const ID = localStorage.getItem('ID');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('ID');
    localStorage.removeItem('notes');
    return (dispatch) => {
        const data = {
            'username': obj.username,
            'password': obj.password,
            'Id': ID
        };
        const options = {
            method: 'PUT',
            headers: { 'content-type': 'application/json', 'Authorization': token },
            data: data,
            url: `${ROOT_URL}userupdate`,
        };
        axios(options)
            .then(res => {

                dispatch({
                    type: UPDATE_USER,
                    payload: res.data
                })
                history.push('/login');
                window.location.reload()
            })
            .catch(err => dispatch({ type: ERRORS }))
    }
};
export const deleteNote = (obj, history) => {
    const token = localStorage.getItem('token');
    return (dispatch) => {

        const data = {
            'Id': '5b10763c5e85b6000400640d'
        };
        const options = {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', 'Authorization': token },
            data: obj,
            url: `${ROOT_URL}delete`,
        };
        axios(options)
            .then(res => {
                dispatch({
                    type: DELETE_NOTE,
                    // payload: res.data
                })
                history.push('/');
            })
            .catch(err => dispatch({ type: ERRORS }))
        // window.location.reload() 
    }
};
export const deleteUser = (history) => {
    const token = localStorage.getItem('token');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('ID');
    localStorage.removeItem('notes');
    return (dispatch) => {
        const data = {
            'Id': localStorage.getItem('ID')
        };
        const options = {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', 'Authorization': token },
            data: data,
            url: `${ROOT_URL}userdelete`,
        };
        axios(options)
            .then(res => {
                dispatch({
                    type: DELETE_USER,
                    payload: res.data
                })
                history.push('/')
            })
    }
}



export const reorderState = (completeObject) => {
    return {
        type: REORDER_STATE,
        payload: completeObject
    }
}



























//  export const addNote = (note) => {
//      return {
//          type: ADD_NOTE,
//          payload: note
//      }
//  };
//  export const updateNote = (noteTitle, noteContent, i) => {
//     return {
//         type: UPDATE_NOTE,
//         title: noteTitle,
//         payload: noteContent,
//         index: i
//     }
// };
// export const addTag = (tag, i) => {
//     console.log('Inside addTag action... tag, i:',tag,i);
//     return {
//         type: ADD_TAG,
//         payload: tag,
//         index: i
//     }
// }
// export const checkUpdate = (bool, i) => {
//     return {
//         type: CHECK_UPDATE,
//         payload: bool,
//         index: i
//     }
// }
//  export const deleteNote = (note) => {
//      return {
//          type: DELETE_NOTE,
//          payload: note
//      }
//  }