var repl = require('repl');
var util = require('util');

var TIME_UNITS = { // Discriminator values mapped against time in years... i.e. how many X in a year
	"YEARLY": 1,
	"MONTHLY": 12,
	"WEEKLY": 52,
	"TENYEARS": 1/10
};

function convertTimeUnits(from, to) {
	if (from.toUpperCase() === "YEARLY") {
		return from / to;
	} else {
		return from * to;
	}
}

function mapTimeUnits(value, from, to) {
	return value * convertTimeUnits(from, to);
}

function compoundInterestForUnitsOfTime(principal, interest, time) {
	return principal * Math.pow((1 + interest), time);
}

/**
 * This function can help calculate your investments based on how much you want to put in,
 * the interest rate that your bank established, what kind and how many of your time units
 * pass by, and actions to perform to affect the data.
 *
 * Params:
 * 	@principal - initial investment 
 * 	@interest - the rate (15% should be represented as 0.15) that your bank compounds
 * 	@time - number of units of times to be compounded
 * 	@timeDiscriminator - enum value identifying what your time units mean (yearly, monthly, weekly, etc)
 *	@timelyAction - a function to inject change every time unit
 *
 */
function calculateInvestment(principal, interest, time, timeDiscriminator, timelyAction) {
	console.log('ci args: ', arguments);
	var calculatedInvestment = compoundInterestForUnitsOfTime(principal, interest, time);

	console.log(
		'Investing $%d \n' +
		'to your bank that gives %d%% interest %s \n' +
		'%d many times \n' +
		'results in $%d total which means a net gain of %d\n' +
		'which is a growth of %d%%',
		principal,
		interest * 100,
		timeDiscriminator,
		time,
		calculatedInvestment,
		calculatedInvestment - principal,
		100 * ((calculatedInvestment - principal) / principal));
}

function replCalculateInvestment(stringInput) {
	var argsArray = stringInput.split(' ');
	argsArray[0] = util.format('Number(%s)', argsArray[0]);
	argsArray[1] = util.format('Number(%s)', argsArray[1]);
	argsArray[2] = util.format('Number(%s)', argsArray[2]);
	var evalStatement = util.format('calculateInvestment(%s)', argsArray.join(','));	
	eval(evalStatement);
}

var replServer = repl.start('($_$)> ');
replServer.defineCommand('ci', {
	help: '\n' +
'###############################################################################################################\n' +
'# Calculate Investment -                                                                                      #\n' +
'#    Params:                                                                                                  #\n' +
'#       @principal - initial investment                                                                       #\n' +
'#       @interest - the rate (15% should be represented as 0.15) that your bank compounds                     #\n' +
'#       @time - number of units of times to be compounded                                                     #\n' +
'#       @timeDiscriminator - enum value identifying what your time units mean (yearly, monthly, weekly, etc)  #\n' +
'#       @timelyAction - a function to inject change every time unit                                           #\n' +
'###############################################################################################################',

	action: replCalculateInvestment
});


