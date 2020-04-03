let express = require('express')
let app = express();
let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);

var Room = require('./Room.js');
var UserController = require('./UserController.js')

var usersController = new UserController();


activesRooms = [];

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

	socket.on('connectUser', (username) => {
		// console.log('added a user')
		user = usersController.saveUsername(username);
		io.emit('newUserConnected', username);
		console.log('user ' + username + ' connected');
	})

	socket.on('disconnect', (reason) => {
		if (user != null) {
			var name = user.getName();
			if ('transport close' == reason) console.log('the user ' + name + ' left\n')
			usersController.deleteUser(name);
			io.emit('userDisconnected', name);
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

	socket.on('getRooms', () => {
		socket.emit('getRoomsResponse', rooms, rooms.length)
	})

	socket.on('roomnameIsAvailable', (name) => {
		var res = true;
		rooms.map((room) => {
			if (name == room.getName()) { res = false; }
		}); socket.emit('roomnameIsAvailableResponse', res)
	})

	socket.on('createRoom', (roomname) => {
		console.log('appel')
		var r = new Room(roomname);
		rooms.push(r);
		socket.emit('addRoom', roomname);
		console.log('room ' + r.getName() + ' was created')
		console.log(rooms)
	})

	socket.on('deleteRoome', (roomname) => {
		var cpt = 0;
		for (var i = r.length - 1; i >= 0; i--) {
			if (r[i].name == roomname) {
				r.splice(i, 1);
				cpt++;
			}
		}
		if (cpt === 0) socket.emit('deleteRoomError', 'room doesn\'t exist ')
		else socket.emit('deletRoomSucces', roomname)

	})

	socket.on('modifyRoom', (roomname, newName) => {
		var cpt = 0;
		for (var i = r.length - 1; i >= 0; i--) {
			if (r[i].name == roomname) {
				r[i].name = newName;
				cpt++;
			}
		}
		if (cpt === 0) {
			socket.emit('modifyRoomError', 'room doesn\'t exist ')
		}
		else {
			socket.emit('modifyRoomSucces', roomname, newName)
		}
	})

	socket.on('joinRoom', (roomname) => {
		var res = false;
		if (roomExists(roomname)) {
			var r = getRoom(roomname);
			r.addUser(user);
			res = true;
			socket.join(roomname);

		}; socket.emit('joinRoomResponse', res)
	})

	socket.on('leaveRoom', (roomname) => {
		var res = false;
		if (roomExists(roomname)) {
			var r = getRoom(roomname);
			r.removeUser(user);
			res = true;
			socket.leave(roomname);

		}; socket.emit('joinRoomResponse', res)
	})


	//==================================================\\
	//messages management

	socket.on('roomMessage', (object) => {
		console.log('new message : '); console.log(object);
		io.to(object.room).emit('roomMessageResponse', object);
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
	var res = false;
	rooms.map((room) => {
		if (roomname == room.getName()) res = true;
	}); return res;
}

function getRoom(roomname) {
	for (var i = 0; i < rooms.length; ++i) {
		if (roomname == rooms[i].getName()) {
			return rooms[i];
		}
	}; return null;
}

// uses a room object
function storeRoom(room) {
	for (var i = 0; i < rooms.length; ++i) {
		if (room.getName() == rooms[i].getName()) {
			rooms[i] = room;
			return true;
		}
	}; return false;
}
