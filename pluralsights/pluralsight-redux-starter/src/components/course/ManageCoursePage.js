import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			course: Object.assign({}, this.props.course),
			errors: {}
		};

		this.updateCourseState = this.updateCourseState.bind(this);
		this.saveCourse = this.saveCourse.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		// React sometimes cannot know if props have changed, so it calls this anyways, so we need
		// to make sure to only do stuff if stuff has changed, thus this conditional statement
		if (this.props.course.id != nextProps.course.id) { 
			// this setState is necessary to populate slow asynchronous data that hasn't been loaded
			// ... like if user opens this url directly from bookmark instead of routing from /courses page
			this.setState({course: Object.assign({}, nextProps.course)});
		}
	}

	updateCourseState(event) {
		const field = event.target.name;
		let course = this.state.course;
		course[field] = event.target.value;
		return this.setState({course: course});
	}

	saveCourse(event) {
		event.preventDefault();
		this.props.actions.saveCourse(this.state.course);
		this.context.router.push('/courses');
	}

	render() {
		return (
			<CourseForm 
				allAuthors={this.props.authors}
				onChange={this.updateCourseState}
				onSave={this.saveCourse}
				course={this.state.course}
				errors={this.state.errors} />
		);
	}
}

ManageCoursePage.propTypes = {
	course: PropTypes.object.isRequired,
	authors: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
	router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
	const courseId = ownProps.params.id;

	let course = { 
		id: '',
		watchHref: '',
		title: '',
		authorId: '',
		length: '',
		category: ''
	};

	if (courseId && state.courses.length > 0) {
		const existingCourse = state.courses.find(c => {
			return c.id == courseId;
		});
		if (existingCourse) {
			course = existingCourse;
		}
	}

	const authorsFormattedForDropdown = state.authors.map(author => {
		return {
			value: author.id,
			text: author.firstName + ' ' + author.lastName
		};
	});

	return {
		course: course,
		authors: authorsFormattedForDropdown
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(courseActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);