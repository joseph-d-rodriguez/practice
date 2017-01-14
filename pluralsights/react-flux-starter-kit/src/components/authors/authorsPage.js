"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var Authors = React.createClass({
	getInitialState: function() {
		return {
			authors: AuthorStore.getAllAuthors()
		};
	},

	componentWillMount: function() {
		AuthorStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		AuthorStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({ authors: AuthorStore.getAllAuthors()});
	},

	deleteAuthor: function(id, event) {
		event.preventDefault();
		AuthorActions.deleteAuthor(id);
		toastr.success('Author Deleted');
	},

	render: function() {

		var createAuthorRow = function(author) {
			return (
				<li key={author.id}>
					{/*<button onClick={this.deleteAuthor.bind(this, author.id)}>Delete</button>*/}
					<Link to="editAuthor" params={{id: author.id}}>{author.id}</Link>
					<h5>{author.fName} {author.lName}</h5>
					<h6>{author.country}</h6>
				</li>
			);
		};

		return (
			<div>
				<h1>Authors</h1>
				<Link to="addAuthor" className="btn btn-default">Add Author</Link>
				<ul>
					{this.state.authors.map(createAuthorRow)}
				</ul>
			</div>
		);
	}
});

module.exports = Authors;