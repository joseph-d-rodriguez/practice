var fs = require('fs');
var path = require('path');

['f1','f2','f3'].forEach(function(item) {
	fs.mkdir(item, function(mkdirError, mkdirData) {
		console.log('mkdirError: ', mkdirError);
		console.log('mkdirData: ', mkdirData);
		console.log('%s directory created!', item);
	});
});
