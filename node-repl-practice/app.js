var repl = require('repl');
var replServer = repl.start({ prompt: "' _ .:"});

replServer.context.caTax = 0.4;

var salaryInfo = function(salary) {
	salary = parseFloat(salary);
	if (salary == NaN) {
		console.error('Salary entered is not a valid number.');
		return;
	}
	const caTax = replServer.context.caTax;
	const hourlyRate = salary / 2080;
	const salaryAfterCaTax = salary - (salary * caTax);
	const monthlyAfterCaTax = salaryAfterCaTax / 12;
	const biweeklyAfterCaTax = salaryAfterCaTax / 26;
	const weeklyAfterCaTax = biweeklyAfterCaTax / 2;
	const hourlyAfterCaTax = weeklyAfterCaTax / 40;
	const calendarDailyAfterCaTax = salaryAfterCaTax / 365;
	const calendarHourlyAfterCaTax = calendarDailyAfterCaTax / 24;
	const calendarMinutelyAfterCaTax = calendarHourlyAfterCaTax / 60;
	const calendarSecondlyAfterCaTax = calendarMinutelyAfterCaTax / 60;

	console.log('Given a salary of $%d, \nthis comes to an hourly rate of $%d. \nBut with California tax as %%%d \nSalary after CA tax: $%d \nMonthly income after CA tax: $%d \nBiweekly income after CA tax: $%d \nWeekly income after CA tax: $%d \nHourly rate (work-week related): $%d \nPer day: $%d \nPer hour: $%d \nPer minute: $%d \nPer second: $%d', salary, hourlyRate, (caTax * 100), salaryAfterCaTax, monthlyAfterCaTax, biweeklyAfterCaTax, weeklyAfterCaTax, hourlyAfterCaTax, calendarDailyAfterCaTax, calendarHourlyAfterCaTax, calendarMinutelyAfterCaTax, calendarSecondlyAfterCaTax);
};

replServer.defineCommand('salaryInfo', { help: 'prints lots of useful info to help manage money', action: salaryInfo });

