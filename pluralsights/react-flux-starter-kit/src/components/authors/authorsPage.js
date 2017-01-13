"use strict";

var React = require('react');

var Authors = React.createClass({
	getInitialState: function() {
		return {
			authors: [
				{
					id: 1,
					name: "Adam",
					country: "USA"
				},
				{
					id: 2,
					name: "Benjamin",
					country: "Germany"
				},
				{
					id: 3,
					name: "Chang",
					country: "China"
				}
			]
		};
	},
	render: function() {
		var createAuthorRow = function(author) {
			return (
				<li key={author.id}>
					<h5>{author.name}</h5>
					<h6>{author.country}</h6>
				</li>
			);
		};

		return (
			<div>
				<h1>Authors</h1>
				<ul>
					{this.state.authors.map(createAuthorRow)}
				</ul>
			</div>
		);
	}
});

module.exports = Authors;