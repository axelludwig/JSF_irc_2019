let express = require('express')
let app = express();
let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);

var Room = require('./Room.js');
var UserController = require('./UserController.js')

var users = new UserController();
var rooms = [];

const port = process.env.PORT || 3000;

// debug
users.saveUsername('axel');
users.saveUsername('peng');
users.saveUsername('quentin');

io.on('connection', (socket) => {
	console.log('user connected');

	socket.on('getUsers', () => {
		console.log(users.toJSON())
		socket.emit('getUsersResponse', users.toJSON())
	})

	socket.on('usernameIsAvailable', (username) => {
		socket.emit('usernameIsAvailableResponse', users.usernameIsAvailable(username))
	})

	socket.on('saveUsername', (username) => {
		var u = users.saveUsername(username);
		console.log(u)
	})

	// pour tester si le pseudo est disponible ou déjà utilisé


	socket.on('roomnameIsAvailable', (name) => {

	})

	socket.on('createRoom', (roomname) => {
		console.log(users.toJSON());
		var r = new Room(roomname);
		rooms.push(r);
		console.log('room ' + roomname + ' was created')
		// var u = users.createUser('axel');
		// var v = users.createUser('peng');
		// var w = users.createUser('quentin');
		// r.addUser(u);
		// r.addUser(v);
		// r.addUser(w);

		// console.log(r.toJSON())
		// r.removeUser('quentin');
		// console.log(r.toJSON())
		// console.log("salut")

		// console.log(r.get)


		// rooms[0].addUser('peng', 1)
		// rooms[0].addUser('axel', 2)
		// rooms[0].toString()
		// rooms[0].removeUser('axel')
		// console.log('room ' + rooms[0].getName() + ' created')
		// console.log(rooms[0].getUserCount())
		// rooms.push(r)
	})

	socket.on('getRooms', () => {

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