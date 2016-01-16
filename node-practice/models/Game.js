module.exports = {

	identity: 'game',
	restPath: 'games',
	connection: 'connLocalMongo',

	attributes: {
		date: 'integer',
		home_team: {
			model: 'Team'
		},
		away_team: {
			model: 'Team'
		}
	}
};
