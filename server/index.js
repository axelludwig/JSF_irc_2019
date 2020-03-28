let express = require('express')
let app = express();
let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);

var Room = require('./Room.js');
var UserController = require('./UserController.js')

var users = new UserController();
var rooms = ["room1", "room2"];

users.saveUsername('axel');
users.saveUsername('peng');

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
	console.log('socket connection starts');

	socket.on('getConnectedUsers', () => {
		console.log(users.toJSON())
		socket.emit('getUsersResponse', users.list)
	})

	socket.on('usernameIsAvailable', (username) => {
		socket.emit('usernameIsAvailableResponse', users.usernameIsAvailable(username))
	})

	socket.on('saveUsername', (username) => {
		var u = users.saveUsername(username);
		console.log('user ' + username + ' connected');
	})

	socket.on('roomnameIsAvailable', (name) => {
		var res = rooms;
		this.list.map((room) => {
			if (name == room.getName()) { res = false; }
		})
		return res;
	})

	socket.on('createRoom', (roomname) => {
		console.log(users.toJSON());
		var r = new Room(roomname);
		rooms.push(r);
		console.log('room ' + roomname + ' was created')
	})


	socket.on('new-message', (message) => {
		io.emit('new-message', message)
	});
});

app.get('/', function (req, res) {
	var datetime = new Date();
	console.log(datetime);
	console.log(users.toJSON());
	res.send('there\'s no api')
})

server.listen(port, () => {
	console.log(`started on port: ${port}`);
});