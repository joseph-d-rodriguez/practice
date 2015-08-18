var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function(req, res) {
	var serverFileStream = fs.createReadStream(path.join(__dirname, 'coolfile.txt'));
	serverFileStream.pipe(res, { end: false });
	serverFileStream.on('end', function() {
		res.end('enjoy my precious bytes! q_q');
	});
}).listen(3232, function() { console.log('Server listening on port 3232'); });
