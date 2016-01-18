module.exports = {

	identity: 'tournament',
	restPath: 'tournaments',
	connection: 'connLocalMongo',

	attributes: {

		name: 'string',
		games: {
			collection: 'game',
			via: 'tournament'
		}
	}
};
