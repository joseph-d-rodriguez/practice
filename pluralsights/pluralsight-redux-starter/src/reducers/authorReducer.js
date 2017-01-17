import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authorReducer(state = initialState.authors, action) {
	let returnVar = null;
	switch(action.type) {
		case types.LOAD_AUTHORS_SUCCESS:
			returnVar = action.authors;
			break;

		default:
			returnVar = state;

	}
	return returnVar;
}