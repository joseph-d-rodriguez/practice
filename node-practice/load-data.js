var http = require('http');
var MongoClient = require('mongodb').MongoClient;

// This data endpoint has no security and if successful,
// contains a "fixtures" collection of objects with
// "date", "homeTeamName", and "awayTeamName".
var dataUrl = "http://www.football-data.org/v1/fixtures";

var url = "mongodb://localhost:27017/waterline-practice";

MongoClient.connect(url, function insertAllData(err, db) {

	http.get({hostname: "www.football-data.org",port:80,path:"/v1/fixtures",method:"GET"}, function handleData(response) {
		var bodyJson = "";
		response.on('data', function(chunk) {
			bodyJson += chunk.toString();
		});

		response.on('end', function() {
			//console.log(bodyJson);
			// Parse data into javascript objects.
			var data = null;
			try {
				data = JSON.parse(bodyJson).fixtures;
			} catch(e) {
				console.error('Failed to parse data...\n', e);
				// Need to stop the program...
				throw e;
			}
			
			// Loop through data and clean up to have just the useful properties.
			data.forEach(function forEachDataCleanUpPropertiesHandler(d) {
				Object.keys(d).forEach(function removeEachKeyHandler(key) {
					if (key != "date" && key != "homeTeamName" && key != "awayTeamName") {
						delete d[key];
					}
				});
			});
			//console.log('Cleaned Data...\n\n', data);

			// Loop through data and gather unique Team names to create.
			var teamNames = {};
			data.forEach(function gatherEachUniqueTeamNameHandler(d) {
				if (!teamNames[d.homeTeamName]) {
					teamNames[d.homeTeamName] = true;
				}
				if (!teamNames[d.awayTeamName]) {
					teamNames[d.awayTeamName] = true;
				}
			});
			console.log('Team Names (%d): \n\n%s', Object.keys(teamNames).length, Object.keys(teamNames));

			// Organize Team Objects
			var teams = [];
			Object.keys(teamNames).forEach(function forEachTeamNameCreateTeamObject(teamName) {
				teams.push({
					name: teamName
				});
			});

			// Insert Tournament
			var tournamentName = "The Tournament @ " + new Date().toString();
			db.collection('tournament').insert({name:tournamentName}, function insertTournament(tournamentError, tournamentResults) {
				var tournamentId = tournamentResults.ops[0]._id;
				console.log('(%s) %s... tournament created successfully', tournamentId, tournamentName);

				// Insert Teams
				db.collection('team').insertMany(teams, function insertTeamsHandler(err, results) {
					
					// Assuming no err
					// if (err) throw err; // ???

					// Create map of team names to IDs to reference later... and also reverse map id -> name
					var teamIds = {};
					results.ops.forEach(function forEachMongoInsertResult(result) {
						teamNames[result.name] = result._id;
						teamIds[result._id] = result.name;
						console.log('(%s) %s... team created successfully', result._id, result.name);
					});

					
					// Organize game data
					data.forEach(function organizeEachFixtureIntoGameData(f) {
						// Replace team names with team Ids
						f.home_team = teamNames[f.homeTeamName];
						f.away_team = teamNames[f.awayTeamName];
						delete f.homeTeamName;
						delete f.awayTeamName;

						// Fix date to represent milliseconds timestamp
						f.date = new Date(f.date).getTime();
					});

					
					// Insert Games
					db.collection('game').insertMany(data, function insertGamesHandler(gameError, gameResults) {
						console.log('Games Inserted...');
						gameResults.ops.forEach(function logEachInsertedGame(game) {
							console.log('%s: Home: %s is challenged by Away: %s', new Date(game.date).toString(), teamIds[game.home_team], teamIds[game.away_team]);
						});

						// Finally close the connection.
						db.close();
					});
				});			
			});
		});
	});
});


