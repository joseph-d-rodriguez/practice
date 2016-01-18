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
			via: 'home_team',
			canPopulate: true
		},
		away_games: {
			collection: 'game',
			via: 'away_team',
			canPopulate: true
		},
		games_won: {
			collection: 'game',
			via: 'winning_team',
			canPopulate: true
		},		

		all_games: function getAllGamesForTeam() {
			return this.home_games.slice().concat(this.away_games.slice()); // slice() is used to clone arrays to not affect original structures
		}
	}
};
