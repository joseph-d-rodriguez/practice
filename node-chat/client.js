const readline = require('readline');

module.exports = {

	connectedToServer: function() {
		console.log('Connected to server');
	},

	rl: null,
	initializePrompt: function() {
		rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	},

	

	connectToServer: function() 
};
