var RulesEngine = require('node-rules');

// Sample fact
var aFact = {
	"isTrue": false,
	"worth": 50.00,
	"powerLevel": 9500,

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
		console.log('fact is false: ', this);
		flow.next();
	},
};

// No rich people allowed
var noRichPeople = {
	"condition": function(flow) {
		flow.when(this.worth > 100000.00);
	},
	"consequence": function(flow) {
		this.ruleFailCount = this.ruleFailCount ? this.ruleFailCount + 1 : 1;
		//this.result = true;
		console.log('fact is rich: ', this);
		flow.next();
	},
};

// Only power levels OVER NINE THOUSAND - WHAT!? NINE THOUSAND - can override other rule failures
var whatsHisPowerLevel = {
	"condition": function(flow) {
		flow.when(this.powerLevel < 9000 && this.ruleFailCount && this.ruleFailCount > 0);
	},
	"consequence": function(flow) {
		this.result = false;
		this.reason = "You're false and too rich... only if your power level was OVER NINE THOUSAND - WHAT!? NINE THOUSAND!? could you continue";
		console.log('fact had failures and was not powerful enough to overcome: ', this);
		flow.stop();
	},
};

// This rule's condition will always be true in order to stop infinite rule processing
var stopRuleEngine = {
	"condition": function(flow) {
		flow.when(true);
	},
	"consequence": function(flow) {
		this.result = true;
		console.log('stopRuleEngine executed: ', this);
		flow.stop();
	}
}

var rEngine = new RulesEngine();
rEngine.register([falseIsBad, noRichPeople, whatsHisPowerLevel, stopRuleEngine]);

rEngine.execute(aFact, function(result) {
	console.log('result: ', result);
});
