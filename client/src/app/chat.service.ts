import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

export class ChatService {
	private url = 'http://localhost:3000';
	public socket;	
	public username;
	public users: [];
	isAvailable: Boolean
	// public isAvailable = false;

	constructor() {
		this.socket = io(this.url);
	}

	// public sendMessage(message) {
	// 	// this.socket.emit('roomMessage', message);

	// 	// var object = {
	// 	// 	message: message,
	// 	// 	username: this.username,
	// 	// 	room: 
	// 	// }
	// 	// this.socket.emit('roomMessage', )
	// }

	public createRoom(roomname) {
		this.socket.emit('createRoom', roomname);
	}

	public saveUsername(username) {
		this.socket.emit('saveUsername', username)
	}

	public getUsers() {
	    this.socket.emit('getConnectedUsers');
	    this.socket.on('getUsersResponse', (users) => {
	        this.users = users;
	    });
	}

	isAvailableUsername(username) {
	    this.socket.emit('usernameIsAvailable', username);
	    this.socket.on('usernameIsAvailableResponse', (boolean) => {
	        this.isAvailable = boolean
	    })
	}


	public test2() {

	}

	public getMessages = () => {
		return Observable.create((observer) => {
			// this.socket.on('new-message', (message) => {
			// 	observer.next(message);
			// });


			this.socket.on('roomMessageResponse', (message) => {

				observer.next(message.message);
			});
			// this.socket.on('getConnectedUsers', (users) => {
			// 	console.log(users)
			// })
		});
	}
}