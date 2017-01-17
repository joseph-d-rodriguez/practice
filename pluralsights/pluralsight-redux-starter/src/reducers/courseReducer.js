import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
	let returnVar = null;
	switch(action.type) {
		case types.LOAD_COURSES_SUCCESS:
			returnVar = action.courses;
			break;

		case types.CREATE_COURSE_SUCCESS:
			returnVar = [
				...state,
				Object.assign({}, action.course)
			];
			break;

		case types.UPDATE_COURSE_SUCCESS:
			returnVar = [
				...state.filter(course => course.id !== action.course.id),
				Object.assign({}, action.course)
			];
			break;

		default:
			returnVar = state;

	}
	return returnVar;
}