var express = require('express');
var Waterline = require('waterline');
var waterlineConfig = require('./db-config.js');
var orm = new Waterline();
var fs = require('fs');

// Gathering models. **************************************
var gatherModels = function(cb) {
	fs.readdir('./models', function readModelsDir(readModelsDirError, modelFiles) {

		if (readModelsDirError) { 
			return cb(readModelsDirError);
		}

		var baseModelObjects = [];
		modelFiles.forEach(function forEachModelFilepath(modelFilepath) {
			// Load model objects to be later orm initialized.
			baseModelObjects.push(require('./models/' + modelFilepath));
		});
		return cb(null, baseModelObjects);
	});
};
// ********************************************************

// Create Express app.
var app = express();

// Define default route.
app.get("/", function defaultRouteHandler(req, res) {

	res.send('hello world');
});

app.post("/teams", function postTeamsHandler(req, res) {
	var body = "";
	req.on('data', function onPostTeamDataHandler(chunk) {
		body += chunk.toString();
		console.log('onPostTeamDataHandler chunk: ', chunk.toString());
	});

	req.on('end', function onPostTeamEndHandler() {
		var jsonRequestBody = null;
		try {
			jsonRequestBody = JSON.parse(body);
		} catch (e) {
			return res.json({ error: e }, 400);
		}

		app.collections.team.create(jsonRequestBody, function createTeamHandler(newTeamError, newTeam) {

			if (newTeamError) {
				return res.json({ error: newTeamError }, 500);
			}

			return res.json(newTeam);
		});
	});
	
});

app.get("/teams", function getTeamsHandler(req, res) {

	app.collections.team.find().exec(function findTeamsHandler(findTeamsError, teamsFound) {

		if (findTeamsError) {
			return res.json({ error: findTeamsError }, 500);
		}

		return res.json(teamsFound);
	});
});

// Initialize ORM.
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

		// Open app for listening.
		app.listen(3232, function expressAppListeningHandler(isThereAnErrorHere) {
			console.log('Express app open and listening on port 3232');
		});
	});
});


