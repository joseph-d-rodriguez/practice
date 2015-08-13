var q = require('q');

var queryLabelById = function(id, cb, optionalDuration) {
	var duration = null;
	if (optionalDuration) {
		duration = optionalDuration;
	} else {
		duration = Math.random() * (10000 - 1000) + 1000; // between 1 and 10 milliseconds
	}
	console.log('DEBUG: duration=%d', duration);
	var result = id.toUpperCase();
	setTimeout(cb, duration, result);
}

queryLabelById('hello', console.log, 1000);
queryLabelById('goodbye', console.log, 1000);
queryLabelById('foo', console.log, 1000);
queryLabelById('bar', console.log, 1000);

var queryLabelByIdPromise = function(id, optionalDuration) {
	var deferred = q.defer();
	queryLabelById(id, function(result) {
		deferred.resolve(result);
	}, optionalDuration);
	return deferred.promise;
}

var p1 = queryLabelByIdPromise('one', 10000);
var p2 = queryLabelByIdPromise('two', 1000);
var p3 = queryLabelByIdPromise('three', 1000);
var p4 = queryLabelByIdPromise('four', 1000);

var promises = [p1,p2,p3,p4];
q.all(promises).then(console.log);




