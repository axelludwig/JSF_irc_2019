let express = require('express')
let app = express();
let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);

var Room = require('./Room.js');
var UserController = require('./UserController.js')

var usersController = new UserController();

//debug
var rooms = [];
var r = new Room('room1');
rooms.push(r);
r = new Room('room2');
rooms.push(r);
console.log(rooms)
usersController.saveUsername('axel');
usersController.saveUsername('peng');

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
	console.log('socket connection starts');
	var user;

	socket.on('saveUsername', (username) => {
		user = usersController.saveUsername(username);
		console.log('user ' + username + ' connected');
	})

	socket.on('disconnect', (reason) => {
		if (user != null) {
			if ('transport close' == reason) console.log('the user ' + user.getName() + ' left\n')
			usersController.deleteUser(user.getName());
		}
	});

	//==================================================\\
	//user management

	socket.on('getConnectedUsers', () => {
		socket.emit('getUsersResponse', usersController.list)
	})

	socket.on('usernameIsAvailable', (username) => {
		socket.emit('usernameIsAvailableResponse', usersController.usernameIsAvailable(username))
	})

	//==================================================\\
	//room management

	socket.on('roomnameIsAvailable', (name) => {
		var res = true;
		rooms.map((room) => {
			if (name == room.getName()) { res = false; }
		})
		socket.emit('roomnameIsAvailableResponse', res)
	})

	socket.on('createRoom', (roomname) => {
		var r = new Room(roomname);
		rooms.push(r);
		console.log('room ' + r.getName() + ' was created')
	})

	socket.on('joinRoom', (roomname) => {
		console.log(roomExists(roomname));
		// socket.emit('roomnameIsAvailableResponse', res)
	})

	//==================================================\\
	//messages management


	socket.on('new-message', (message) => {
		io.emit('new-message', message)
	});
});

app.get('/', function (req, res) {
	res.json(usersController.list)
})

app.get('/rooms', function (req, res) {
	res.json(rooms)
})

server.listen(port, () => {
	console.log(`started on port: ${port} \n`);
});


//==================================================\\
//rooms management functions

function roomExists(roomname) {
	rooms.map((room) => {
		if (roomname == room.getName()) {
			return true;
		}
	}); return false;
}

// function getRoom() {
// 	for(var i = 0; i < rooms.length; ++i) {
// 		if (rooms[])
// 	}
// }
