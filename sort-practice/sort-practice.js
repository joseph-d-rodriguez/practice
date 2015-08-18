var jsonData = [
	{
		"firstName": "Frank",
		"lastName": "Fwick",
		"age": 20
	},
	{
		"firstName": "Ferdinand",
		"lastName": "Fwick",
		"age": 50
	},
	{
		"firstName": "Ferdinand",
		"lastName": "Fwick",
		"age": 45
	},
	{
		"firstName": "Bob",
		"lastName": "Belcher",
		"age": 45
	},
	{
		"firstName": "Eric",
		"lastName": "Ettle",
		"age": 32
	},
	{
		"firstName": "Adam",
		"lastName": "Archer",
		"age": 36
	},
	{
		"firstName": "Charlie",
		"lastName": "Crevis",
		"age": 14
	},
	{
		"firstName": "David",
		"lastName": "Deandaran",
		"age": 24
	}
];

var jsonParams = [
	{ "field": "lastName", "order": "asc" },
	{ "field": "firstName", "order": "asc" },
	{ "field": "age", "order": "asc" }
];

/**
 * betterSort
 *
 * @description		:: sorts collections via collection of fields & orderings
 * @param data		:: json data to sort
 * @param params	:: json collection of "field" and "order" attributes which to apply on @data
 */
var betterSort = function(data, params) {
	data.sort(function(a, b) {
		var compareResult = 0;
		for (var i=0; i < params.length; i++) {
			// Perform ASCENDING LOGIC always, then flip result if order=desc
			if (a[params[i].field] < b[params[i].field]) {
				compareResult = -1; 
				if (params[i].order && params[i].order === 'desc') { // DESCENDING LOGIC
					compareResult = -compareResult; // Reverse compare result if DESC
				}
				break; // break out of sorting params if compareResult is already found
			} else if (a[params[i].field] > b[params[i].field]) {
				compareResult = 1;
				if (params[i].order && params[i].order === 'desc') { // DESCENDING LOGIC
					compareResult = -compareResult; // Reverse compare result if DESC
				}
				break; // break out of sorting params if compareResult is already found
			} else {
				// via the current sorting param, a and b are equal, so move on
				//continue;
			}
			
			

		}

		return compareResult;
	});

}

//var jsonData = JSON.parse(data);
//var jsonParams = JSON.parse(paramsSample);

console.log('Original data: \n%j\n\n', jsonData);
console.log('Sort Configurations: %j\n\n', jsonParams);

betterSort(jsonData, jsonParams);

console.log('jsonData: ', jsonData);
//console.log('jsonParams: ', jsonParams);

