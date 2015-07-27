var express = require('express');
var bodyParser = require('body-parser');
var socketio = require('socket.io');

var app = express();
var server = app.listen(8000, function () {
	console.log('Listening port 8000...');
});
var io = socketio.listen(server);

//console.log(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

var messages = [];


app.get('/', function (req, res) {
	//console.log(__dirname + '\\public\\index.html');
	res.sendFile( __dirname + '/public/index.html');
});

io.on('connection', function (socket) {

	console.log('Client connected');

	socket.on('disconnected', function () {
		console.log('Client disconnected');
	});

	socket.on('chat message', function (msg) {
		messages.push(msg);
		console.log(msg);
		io.emit('chat message', msg);
	});

	io.emit('chat history', messages);

});
