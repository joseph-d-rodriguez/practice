
// Stream req input as json. ******************************
var streamRequestAndParseJson = function(request, cb) {

	var requestJson = "";
	request.on('data', function buildRequestJsonInChunks(chunk) {

		requestJson += chunk.toString();
	});

	request.on('end', function onStreamEndHandler() {
		var requestObject = null;
		try {
			requestObject = JSON.parse(requestJson);
		} catch (e) {
			e.statusCode = 400;
			return cb(e);
		}
		return cb(null, requestObject);
	});
};
// ********************************************************

// Configuring REST CRUD for models. **********************
var configCrudForModels = function(app) {

	Object.keys(app.collections).forEach(function expressCrudForEachModelHandler(modelIdentity) {
		var model = app.collections[modelIdentity];

		app.post("/" + model.restPath, function postModelHandler(req, res) {
			
			streamRequestAndParseJson(req, function postHandler(streamError, requestObject) {

				if (streamError) {
					return res.json({ error: streamError }, streamError.statusCode || 500);
				}

				model.create(requestObject, function createModelHandler(newModelError, newModel) {

					if (newModelError) {
						return res.json({ error: newModelError }, 500);
					}

					return res.json(newModel);
				});
			});
			
		});

		app.get("/" + model.restPath, function getModelsHandler(req, res) {

			model.find().exec(function findModelsHandler(findModelsError, modelsFound) {

				if (findModelsError) {
					return res.json({ error: findModelsError }, 500);
				}

				return res.json(modelsFound);
			});
		});

		app.get("/" + model.restPath + "/:id", function getModelByIdHandler(req, res) {

			model.findOne({ id: req.params.id }, function findOneModelById(findOneError, foundModel) {

				if (findOneError) {
					return res.json({ error: findOneError }, 500);
				}

				return res.json(foundModel);
			});
		});

		app.put("/" + model.restPath + "/:id", function updateModelByIdHandler(req, res) {

			streamRequestAndParseJson(req, function putHandler(streamError, requestObject) {
				// Remove ID from data transfer object.
				delete requestObject.id;

				model.update({ id: req.params.id }, requestObject, function updateModelHandler(updateModelError, updatedModel) {

					if (updateModelError) {
						return res.json({ error: updateModelError }, 500);
					}

					return res.json(updatedModel);
				});
			});
		});

		app.delete("/" + model.restPath + "/:id", function deleteModelByIdHandler(req, res) {

			model.destroy({ id: req.params.id }, function(deleteError) {

				if (deleteError) {
					return res.json({ error: deleteError }, 500);
				}

				return res.json({ status: 'OK', message: 'Deleted ' + model.identity + ' ' + req.params.id + ' successfully.' });
			});
		});
	});
};
// ********************************************************

module.exports = configCrudForModels;

