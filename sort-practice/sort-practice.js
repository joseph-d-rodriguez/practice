var data = '[
	{
		"firstName": "Adam",
		"lastName": "Archer",
		"age": 36
	},
	{
		"firstName": "Bob",
		"lastName": "Belcher",
		"age": 45
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
	},
	{
		"firstName": "Eric",
		"lastName": "Ettle",
		"age": 32
	}
]';

var paramsSample = '[
	{ "field": "lastName", "order": "asc" },
	{ "field": "firstname", "order": "asc" },
	{ "field": "age", "order": "asc" }
]';

var betterSort = function(data, params) {
	data.sort(function(a, b) {
		var compareResult = 0;
		for (var i=0; i < params.length; i++) {
			if (sortConfig.order && sortConfig.order === 'desc') {
				if (b[sortConfig.field] < a[sortConfig.field]) {
					compareResult = 1; // positive with desc means b appears before a 
					break; // break out of sorting params if compareResult is already found
				} else if (b[sortConfig.field] > a[sortConfig.field]) {
					compareResult = -1; // negative with desc means a appears before b
					break; // break out of sorting params if compareResult is already found
				} else {
					// via the current sorting param, a and b are equal, so move on
					continue;
				}
			}
		});		

		

}
