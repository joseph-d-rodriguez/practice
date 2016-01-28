//console.log('command line statement executed:\n', process.argv);

var argCount = process.argv.length;
if (argCount < 3) {
	console.error('no command provided');
	return -1;
}

var net = require('net');
var util = require('util');
var protocolBegin = '###^',
	protocolEnd = '$###';

if (process.argv[2] == 'server') {
	var clients = [];
	var onConnectListener = function onConnectListenerConstructor(client) {
		
		console.log('client connected');
		clients.push(client);

		client.on('data', function onServerGetsClientData(chunk) {
			var message = chunk.toString();
			console.log('client[%d]: %s', new Date().getTime(), message);
			for (var i = 0; i < clients.length; i++) {
				if (clients[i] !== client) {
					clients[i].write(util.format('CLIENT %d SAYS: %s', i, message));
				}
			}
		});
		
		client.on('end', function onClientEndListener() {
			console.log('client disconnected');
			// clients.forEach(function findAndRemoveDisconnectedClient(c) {});
		});

		client.write('hello\r\n');
		//client.end();
	}

	var chatServer = net.createServer(onConnectListener);

	chatServer.listen(2232, function onServerListenListener() {

		console.log('server listening on 2232');
	});
} else if (process.argv[2] == 'client') {
	var readline = require('readline');
	var rl = readline.createInterface({ input: process.stdin, output: process.stdout });

	var doClientStuff = function(clientSocket) {
		rl.question('What would you like to say to the server? ', function handleUserAnswerPrompt(answer) {
				
			var protocoledAnswer = protocolBegin + answer + protocolEnd;
			clientSocket.write(protocoledAnswer);
			doClientStuff(clientSocket);
		});
	};

	var client = net.connect({port:2232}, function onClientConnectListener() {
		console.log('connected to server');
		doClientStuff(client);
	});

	client.on('data', function onClientReceivesData(d) {
		console.log('Server says: ', d.toString());
	});

	client.on('end', function onClientEnd() {
		console.log('disconnected from server');
	});
} else {
	console.error('command %s not recognized', process.argv[2]);
}

