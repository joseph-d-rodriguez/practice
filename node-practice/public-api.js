var commonApi = require('./common-api.js');

// Part 1 Server Side APIs: Expose Public APIs to get the following info

module.exports = function initializePublicApi(app) {

	// Use express's app.HTTPMETHOD to configure routes with a handler.

	// List of upcoming games
	app.get("/upcominggames", function getUpcomingGamesHandler(req, res) {
		commonApi.queryCollectionAndJsonResponse({
			collection: app.collections.game,
			query: { date: { ">=": new Date().getTime() } },
			populate: ["home_team", "away_team"],
			response: res
		});
	});

	// List of past games
	app.get("/pastgames", function getPastGamesHandler(req, res) {
		commonApi.queryCollectionAndJsonResponse({
			collection: app.collections.game,
			query: { date: { "<": new Date().getTime() } },
			populate: ["home_team", "away_team"],
			response: res
		});
	});

	// List of Teams
	// crud-boilerplate.js already handles this

	// Team Info
	// crud-boilerplate.js already handles this
};
