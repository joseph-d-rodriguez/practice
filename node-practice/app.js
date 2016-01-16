var express = require('express');
var Waterline = require('waterline');
var waterlineConfig = require('./db-config.js');
var orm = new Waterline();
var fs = require('fs');
var configCrudForModels = require('./crud-boilerplate.js');
var gatherModels = require('./gather-models.js');

// Create Express app.
var app = express();

// Define default route.
app.get("/", function defaultRouteHandler(req, res) {

	res.send('hello world');
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

		// Open app for listening.
		app.listen(3232, function expressAppListeningHandler(isThereAnErrorHere) {
			console.log('Express app open and listening on port 3232');
		});
	});
});


