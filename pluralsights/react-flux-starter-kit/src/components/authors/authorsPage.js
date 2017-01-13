"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuthorApi = require('./authorApi');

var Authors = React.createClass({
	getInitialState: function() {
		return {
			authors: []
		};
	},

	componentDidMount: function() {
		if (this.isMounted()) {
			this.setState({ authors: AuthorApi.getAllAuthors() });
		}
	},

	render: function() {
		var createAuthorRow = function(author) {
			return (
				<li key={author.id}>
					<Link to="editAuthor" params={{id: author.id}}>{author.fName} {author.lName}</Link>
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