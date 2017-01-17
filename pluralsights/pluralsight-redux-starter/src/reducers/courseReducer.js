import 'babel-polyfill'; // for array spread operator '...'
import * as types from '../actions/actionTypes';

export default function courseReducer(state = [], action) {
	let returnVar = null;
	switch(action.type) {
		case types.CREATE_COURSE:
			returnVar = [...state,
				Object.assign({}, action.course)
				];
			break;

		default:
			returnVar = state;

	}
	return returnVar;
}