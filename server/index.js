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

io.on('connection', (socket) => {
    // socket.join('some room');
    // console.log(socket)
    console.log('user connected');
    

  socket.on('createRoom', (name) => {    
    var r = new Room(name);
    var u = users.createUser('axel');
    var v = users.createUser('peng');
    var w = users.createUser('quentin');
    r.addUser(u);
    r.addUser(v);
    r.addUser(w);

    console.log(r.toJSON())
    r.removeUser('quentin');
    console.log(r.toJSON())

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

    // socket.on('test1', () => {
    //   socket.join('test1');
    //   console.log("test1 works")
    // })

    // socket.on('test2', () => {
    //   socket.join('room2');
    //   console.log("test2 works")
    // })

    socket.on('new-message', (message) => {
        io.emit('new-message', message)
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});