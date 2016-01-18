module.exports = {

	identity: 'game',
	restPath: 'games',
	connection: 'connLocalMongo',

	attributes: {
		date: 'integer',
		home_team: {
			model: 'team',
			canPopulate: true
		},
		away_team: {
			model: 'team',
			canPopulate: true
		},
		tournament: {
			model: 'tournament',
			canPopulate: true
		},
		winning_team: {
			model: 'team',
			canPopulate: true
		},

		dateString: function getYYYYMMDD() {
			if (this.date) {
				var d = new Date(this.date); // Convert milliseconds to date object.
				this.date_string = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
			}
		},

		initializeFormulaFields: function initializeFormulaFieldHandler() {
			this.dateString();
		}
	}
};
