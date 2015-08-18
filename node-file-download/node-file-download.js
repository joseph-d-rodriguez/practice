console.log('cwd: ', __dirname);
var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function(req, res) {
	fs.readFile(path.join(__dirname, 'coolfile.txt'), function(err, data) {
		if (err) {
			console.error('error reading ./coolfile.txt: ', err);
			res.end(err.toString());
		} else {
			res.end(data);
		}
	});
}).listen(3232, function() { console.log('Server listening on port 3232'); });
