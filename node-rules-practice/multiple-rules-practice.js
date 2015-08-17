var RulesEngine = require('node-rules');

// Sample fact
var aFact = {
	"isTrue": false,
	"worth": 500000.00,
	"powerLevel": 8500,

}; 

// Rules

// False is bad
var falseIsBad = {
	"condition": function(flow) {
		flow.when(!this.isTrue);
	},
	"consequence": function(flow) {
		this.ruleFailCount = this.ruleFailCount ? this.ruleFailCount + 1 : 1;		
		//this.result = true;
		flow.next();
	},
	"priority": 1
};

// No rich people allowed
var noRichPeople = {
	"condition": function(flow) {
		flow.when(this.worth > 100000.00);
	},
	"consequence": function(flow) {
		this.ruleFailCount = this.ruleFailCount ? this.ruleFailCount + 1 : 1;
		//this.result = true;
		flow.next();
	},
	"priority": 2
};

// Only power levels OVER NINE THOUSAND - WHAT!? NINE THOUSAND - can override other rule failures
var whatsHisPowerLevel = {
	"condition": function(flow) {
		flow.when(this.powerLevel < 9000 && this.ruleFailCount && this.ruleFailCount > 0);
	},
	"consequence": function(flow) {
		this.result = false;
		this.exception = "You're false and too rich... only if your power level was OVER NINE THOUSAND - WHAT!? NINE THOUSAND!? could you continue";
		flow.stop();
	},
	"priority": 3
};

var rEngine = new RulesEngine([falseIsBad, noRichPeople, whatsHisPowerLevel]);

rEngine.execute(aFact, function(result) {
	console.log('result: ', result);
});
console.log('rEngine: ', rEngine);
