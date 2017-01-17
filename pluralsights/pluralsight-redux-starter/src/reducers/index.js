import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';

const rootReducer = combineReducers({
	courses, // es6 terse shorthand property name left-hand only
	authors
});

export default rootReducer;