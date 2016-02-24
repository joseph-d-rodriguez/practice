var assert = require('assert');
var http = require('http');
var request = require('supertest');
var net = require('net');

describe("Starting my api server and testing...", function() {
	it("POSTs should NOT work without authorization", function(done) {
		this.timeout(5000);

		// start app
		var myApp = require('../app.js');

		setTimeout(function waitForAppToLoadAndThenRunTests() {
			var options = {
				method: "POST",
				hostname: "localhost",
				port: 3232,
				path: "tournaments"
			};
			var options2 = {
				method: "GET",
				hostname: "football-data.org",
				port: 80,
				path: "/v1/fixtures"
			};

			var client = net.connect({port:3232,path:"/tournaments"}, function() {
				assert(true);
				done();
			});
			client.on('data', function(chunk) {
				console.log('client.on(%s)', chunk.toString());
			});
			client.on('end', function() {
				console.log('client.on("end")');
			});

			//request(myApp).get('/tournaments').expect(200, done);

/*
			var requestStream = http.get(options2, function postWithoutAuthenticationHandler(response) {
console.log('response: ', response);
				var bodyJson = "";
				response.on('data', function(chunk) {
					bodyJson += chunk.toString();
				});

				response.on('end', function() {
					console.log('response ended: ', response.statusCode);
					assert(true);
					done();
				});
			});

			requestStream.on('error', function(e) {
				console.error('caught error: ', e);
			});

			//requestStream.write('hello?');
			//requestStream.end();
*/

		}, 1000);
	});

});
