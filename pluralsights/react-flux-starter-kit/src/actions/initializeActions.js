"use strict";

var Dispatcher = require('../appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var AuthorApi = require('../components/authors/authorApi');

var InitializeActions = {
	initApp: function() {
		Dispatcher.dispatch({
			actionType: ActionTypes.INITIALIZE,
			initialData: {
				authors: AuthorApi.getAllAuthors()
			}
		});
	}
};

module.exports = InitializeActions;