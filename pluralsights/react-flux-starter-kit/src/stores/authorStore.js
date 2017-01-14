"use strict";

var Dispatcher = require('../appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _authors = [];

var AuthorStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	getAllAuthors: function() {
		return _authors;
	},

	getAuthorById: function(id) {
		return _authors.find(function(a) { return a.id == id; });
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case ActionTypes.INITIALIZE:
			_authors = action.initialData.authors;
			AuthorStore.emitChange();
			break;

		case ActionTypes.CREATE_AUTHOR:
			_authors.push(action.author);
			AuthorStore.emitChange();
			break;

		case ActionTypes.UPDATE_AUTHOR:
			_authors.splice(
				_authors.findIndex(function(a){return a.id == action.author.id;}),
				1,
				action.author);
			AuthorStore.emitChange();
			break;

		case ActionTypes.DELETE_AUTHOR:
			_authors.splice(
				_authors.findIndex(function(a){return a.id == action.id;}),
				1);
			AuthorStore.emitChange();
			break;

		default:
	}
});

module.exports = AuthorStore;
