"use strict";

var React = require('react');
var AuthorForm = require('./authorForm');
var AuthorApi = require('./authorApi');
var Router = require('react-router');
var toastr = require('toastr');
var _ = require('lodash');

var ManageAuthorPage = React.createClass({
	statics: {
		willTransitionFrom: function(transition, component) {
			if (component.state.dirty) {
				if (!confirm('Leave without saving?')) {
					transition.abort();
				}
			}
		}
	},

	mixins: [
		Router.Navigation
	],

	getInitialState: function() {
		return {
			author: { id: '', fName: '', lName: '' },
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function() {
		var authorId = this.props.params.id; // React router passes params via props automatically via /author/:id
		console.log('looking for author by id: ', authorId);
		if (authorId) {
			var a = AuthorApi.getAuthorById(authorId);
			console.log('found author: ', a);
			this.setState({author: _.cloneDeep(a)});
		}
	},

	setAuthorState: function(event) {
		this.setState({dirty: true});
		var field = event.target.name;
		var value = event.target.value;
		this.state.author[field] = value;
		return this.setState({ author: this.state.author});
	},

	authorFormIsValid: function() {
		var formIsValid = true;
		this.state.errors = {}; // clear previous errors
		if (this.state.author.fName.length < 3) {
			formIsValid = false;
			this.state.errors.fName = "First name must be at least 3 characters long.";
		}
		if (this.state.author.lName.length < 3) {
			formIsValid = false;
			this.state.errors.lName = "Last name must be at least 3 characters long.";
		}

		this.setState({ errors: this.state.errors});
		return formIsValid;
	},

	saveAuthor: function(event) {
		event.preventDefault(); // no lame default html behavior

		if (!this.authorFormIsValid()) {
			return;
		}

		AuthorApi.saveAuthor(this.state.author);
		this.setState({dirty: false});

		toastr.success('Author saved!');
		this.transitionTo("authors");
	},

	render: function() {
		return (
			<AuthorForm 
				author={this.state.author} 
				onChange={this.setAuthorState}
				onSave={this.saveAuthor}
				errors={this.state.errors} />
		);
	}
});

module.exports = ManageAuthorPage;