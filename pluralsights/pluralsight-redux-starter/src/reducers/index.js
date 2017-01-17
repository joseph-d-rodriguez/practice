import {combineReducers} from 'redux';
import courses from './courseReducer';

const rootReducer = combineReducers({
	courses // es6 terse shorthand property name left-hand only
});

export default rootReducer;