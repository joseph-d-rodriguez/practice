import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
	courses, // es6 terse shorthand property name left-hand only
	authors,
	ajaxCallsInProgress
});

export default rootReducer;