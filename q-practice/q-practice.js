var q = require('q');
var fs = require('fs');

var jlog = function(content) {
	console.log('INFO... ');
	console.log(content);
}
var jerror = function(content) {
	console.log('ERROR... ');
	console.log(content);
}

var slowFileRead = function(filename) {
	console.log('DEBUG: slowFileRead("%s")', filename);

	// Create promise	
	var deferred = q.defer();
	console.log('DEBUG: var deferred = q.defer();');

	setTimeout(function() {
		fs.readFile(filename, function(fsReadErr, fsReadData) {
			console.log('DEBUG: fs.readFile("%s", callback...');

			if (fsReadErr) {
				console.log('DEBUG: fs.readFile errored');
				console.log('DEBUG: %s', fsReadErr);
				deferred.reject(fsReadErr);
			} else {
				console.log('DEBUG: fs.readFile success');
				console.log('DEBUG: ', fsReadData.toString());
				deferred.resolve(fsReadData.toString());
			}
		});
	},
	5000); // Force 5 seconds to read the file
	console.log('DEBUG: setTimeout(..., 5000);');
	
	return deferred.promise;
}

console.log('Reading file: %s', process.argv[2]);
//var slowPromise = slowFileRead(process.argv[2]).then(function(data) { console.log('then data: ', data); return data; }, function(error) { console.log('slow errored: ', error); }).catch(jerror);
var slowPromise = slowFileRead(process.argv[2]).then(console.log);

console.log('instant slowPromise: ', slowPromise);
setTimeout(function() { console.log('final slowPromise: ', slowPromise); }, 6500);

