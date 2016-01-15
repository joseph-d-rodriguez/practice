// First require in waterline adapters.
var mongoAdapter = require('sails-mongo');

module.exports = {

	// Setup Adapters that have been required.
	adapters: {
		'default': mongoAdapter,
		mongo: mongoAdapter
	},

	// Build Connections and setup with named adapter configs.
	connections: {
		connLocalMongo: {
			adapter: 'mongo',
			host: 'localhost',
			database: 'waterline-practice'
		}
	}

};
