"use strict";

var React = require('react');
var Input = require('../common/textInput');

var AuthorForm = React.createClass({
	propTypes: {
		author: React.PropTypes.object.isRequired,
		onSave: React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},

	render: function() {
		return (
			<form>
				<h1>Manage Author</h1>
				<Input
					name="fName"
					label="First Name"
					placeholder="First Name"
					value={this.props.author.fName}
					onChange={this.props.onChange}
					error={this.props.errors.fName} />

				<Input
					name="lName"
					label="Last Name"
					placeholder="Last Name"
					value={this.props.author.lName}
					onChange={this.props.onChange}
					error={this.props.errors.lName} />

				<input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
			</form>
		);
	}
});

module.exports = AuthorForm;