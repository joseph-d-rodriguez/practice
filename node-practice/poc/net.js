var net = require('net');

var client = net.connect({port:3232}, function() {

	console.log('connected?');

	client.write('hello?');
});

var totalData = "";
client.on('data', function(chunk) {
	var s = chunk.toString();
	console.log('logging data event: ', s);
	totalData += s;

	client.end();
});

client.on('end', function() {
	console.log('client ended');
	
});

