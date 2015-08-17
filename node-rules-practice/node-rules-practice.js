var RuleEngine = require('node-rules');
 

var tinyNumberRule = {
	"condition": function(R) {
		this.tinyNumbers = [];
		var thisTinyNumbers = this.tinyNumbers;
		this.forEach(function(item) {
			if (item < 5) {
				thisTinyNumbers.push(item);
			}
		});
		R.when(true);
	},
	"consequence": function(R) {
		this.result = false;
		R.stop();
	}
};

var numbersFact = [1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1];

var tinyNumberRuleEngine = new RuleEngine([tinyNumberRule]);

tinyNumberRuleEngine.execute(numbersFact, function(result) {
	console.log('result: ', result);
});
