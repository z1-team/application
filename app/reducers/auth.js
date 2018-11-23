import {AUTH_LOGIN, AUTH_LOGOUT} from '../actions'

const initialState = {
	inProgress: false,
	token: null
}

function processLogin(state, action) {
	switch(action.status) {
		case 0:
			return {inProgress: true, token: null}
		case 1:
			return {inProgress: false, token: action.token}
		case 2:
			return {inProgress: false, token: null}
		default:
			return state
	}
}

function authReducer(state = initialState, action) {
	switch(action.type) {
		case AUTH_LOGIN:
			return processLogin(state, action)
		case AUTH_LOGOUT:
			return {inProgress: false, token: null}
		default:
			return state
	}
}

export default authReducer