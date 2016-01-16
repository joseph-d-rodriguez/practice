module.exports = {

	identity: 'team',
	restPath: 'teams',
	connection: 'connLocalMongo',

	attributes: {
		name: 'string',
		slogan: 'string',
		location: 'string',
		logo: 'string',
		website: 'string',
		home_games: {
			collection: 'game',
			via: 'home_team'
		},
		away_games: {
			collection: 'game',
			via: 'away_team'
		},

		all_games: function getAllGamesForTeam() {
			return this.home_games.slice().concat(this.away_games.slice()); // slice() is used to clone arrays to not affect original structures
		}
	}
};
