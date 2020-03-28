let express = require('express')
let app = express();
let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);

var Room = require('./Room.js');
var UserController = require('./UserController.js')

var usersController = new UserController();
var rooms = ["room1", "room2"];

usersController.saveUsername('axel');
usersController.saveUsername('peng');

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
	var user;

	console.log('socket connection starts');

	socket.on('saveUsername', (username) => {
		user = usersController.saveUsername(username);
		console.log('user ' + username + ' connected');
	})

	socket.on('disconnect', (reason) => {
		if ('transport close' == reason) console.log('the user left')
		if (null != user) usersController.deleteUser(user.getName());
		console.log('')
	});

	socket.on('getConnectedUsers', () => {
		socket.emit('getUsersResponse', usersController.list)
	})

	socket.on('usernameIsAvailable', (username) => {
		socket.emit('usernameIsAvailableResponse', usersController.usernameIsAvailable(username))
	})

	socket.on('roomnameIsAvailable', (name) => {
		var res = rooms;
		this.list.map((room) => {
			if (name == room.getName()) { res = false; }
		})
		return res;
	})

	socket.on('createRoom', (roomname) => {
		var r = new Room(roomname);
		rooms.push(r);
		console.log('room ' + roomname + ' was created')
	})


	socket.on('new-message', (message) => {
		io.emit('new-message', message)
	});
});

app.get('/', function (req, res) {
	res.json(usersController.list)
})

server.listen(port, () => {
	console.log(`started on port: ${port} \n`);
});