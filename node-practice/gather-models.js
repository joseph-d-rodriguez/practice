var fs = require('fs');

// Gathering models. **************************************
module.exports = function gatherModels(cb) {
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
