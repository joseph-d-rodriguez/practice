"use strict";

var authors = [
				{
					id: "1",
					fName: "Adam",
					lName: "Appleseed",
					country: "USA"
				},
				{
					id: "2",
					fName: "Benjamin",
					lName: "Button",
					country: "Germany"
				},
				{
					id: "3",
					fName: "Chang",
					lName: "Chong",
					country: "China"
				}
			];

var AuthorApi = {
	getAllAuthors: function() {
		return authors;
	},

	saveAuthor: function(author) {
		if (!author.id) {
			author.id = author.fName.toLowerCase() + '-' + author.lName.toLowerCase();
			authors.push(author);
		} else {
			//update
			authors.splice(
				authors.findIndex(function(a){return a.id == author.id;}),
				1,
				author);
		}
	},

	getAuthorById: function(id) {
		return authors.find(function(a) { return a.id == id; });
	}
};

module.exports = AuthorApi;