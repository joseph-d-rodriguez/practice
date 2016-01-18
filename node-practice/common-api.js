module.exports = {

	// Query 
	queryCollection: function(options, cb) {
		var query = options.collection.find({ where: options.query });
		if (options.populate && Array.isArray(options.populate)) {
			options.populate.forEach(function populateForEachAssociation(associate) {
				query.populate(associate);
			});
		}
		query.exec(function queryCollection(queryError, results) {
			if (queryError) {
				return cb(queryError);
			} else {
				return cb(null, results);
			}
		});
	},

	// Query and handle response
	queryCollectionAndJsonResponse: function(options) {

		this.queryCollection(options, function queryCollectionAndLoadFormulaAttributesHandler(queryCollectionError, queryResults) {

			if (queryCollectionError) {
				return options.response.json({ error: queryCollectionError }, 500);
			}

			// Include date_string
			queryResults.forEach(function initializeFormulaFieldForEachResult(r) {
				if (r.initializeFormulaFields) {
					r.initializeFormulaFields();
				}
			});

			return options.response.json(queryResults);
		});
	}
};
