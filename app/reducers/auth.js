import {AUTH_LOGIN, AUTH_LOGOUT} from '../actions'

const initialState = {
	inProgress: false,
	token: null,
	error: false
}

function processLogin(state, action) {
	switch(action.status) {
		case 0:
			return {inProgress: true, token: null, error: false}
		case 1:
			return {inProgress: false, token: action.token, error: false}
		case 2:
			return {inProgress: false, token: null, error: true}
		default:
			return state
	}
}

function authReducer(state = initialState, action) {
	switch(action.type) {
		case AUTH_LOGIN:
			return processLogin(state, action)
		case AUTH_LOGOUT:
			return {inProgress: false, token: null, error: false}
		default:
			return state
	}
}

export default authReducer
