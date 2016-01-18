var express = require('express');
var Waterline = require('waterline');
var waterlineConfig = require('./db-config.js');
var orm = new Waterline();
var fs = require('fs');
var configCrudForModels = require('./crud-boilerplate.js');
var gatherModels = require('./gather-models.js');
var  initializePublicApi = require('./public-api.js');

// Create Express app.
var app = express();

// Create some authentication handler.
var authToken = "1cd66d6d-4379-4d0c-8a65-1a29e97ae327";
app.authHandler = function(req, res, next) {

	if (req.headers && req.headers.authentication && req.headers.authentication == authToken) {
		next();
	} else {
		return res.status(401).json({ error: "Unauthorized" });
	}
};

// Log all requests (for code-review visibility)
app.use(function(req, res, next) {
	console.log('%s: %s %s', new Date().toString(), req.method, req.url);
	return next();
});

// Find all models.
gatherModels(function gatherModelsHandler(gatherModelsError, gatheredModels) {

	if (gatherModelsError) { throw gatherModelsError; }

	gatheredModels.forEach(function forEachModelObject(m) {
		// Extend Waterline's Collection object and load the collection into our ORM.
		orm.loadCollection(Waterline.Collection.extend(m));
	});
	console.log('Waterline Models Loaded.');

	// Initialize our ORM.
	orm.initialize(waterlineConfig, function initializingOrm(initializeError, waterlineOrm) {

		if (initializeError) { throw initializeError; }

		// Add our ORM models to our Express app.
		app.collections = waterlineOrm.collections;

		// Config basic CRUD routes for all models.
		configCrudForModels(app);

		// Initialize public APIs.
		initializePublicApi(app);

		// Open app for listening.
		app.listen(3232, function expressAppListeningHandler(isThereAnErrorHere) {
			console.log('Express app open and listening on port 3232');
		});
	});
});

