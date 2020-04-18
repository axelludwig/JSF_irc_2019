import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

export class ChatService {
	private url = 'http://194.147.2.105:3000/';
	public socket;
	public room;
	public username;
	public users: [];
	isAvailable: Boolean
	// public isAvailable = false;

	constructor() {
		this.socket = io(this.url);
	}

	// public createRoom(roomname) {
	// 	this.socket.emit('createRoom', roomname);
	// }


	public test2() {

	}



	public getAllRooms = () => {
		return Observable.create((observer) => {
			this.socket.on('roomMessageResponse', (message) => {
				observer.next(message.message);
			});
		});
	}

	public userUpdate = () => {
		return Observable.create((observer) => {
			this.socket.on('newUserConnected', (user) => {
				observer.next({
					username: user,
					type: 'add'
				});
			});
			this.socket.on('userDisconnected', (user) => {
				observer.next({
					username: user,
					type: 'remove'
				});
			})
		})
	}

// get all the rooms 


	public getNewRoom =() =>{
		return Observable.create((observer)=>{
			this.socket.on('addRoom',(room) => {
				observer.next({
					name: room,
					type: 'add'
				});
			});
			this.socket.on('deletRoomSucces', (room) => {
				observer.next({
					name: room,
					type: 'remove'
				});
			});
			this.socket.on('modifyRoomSucces',(objet) =>{
				observer.next({
					name: objet.rn,
					newName: objet.nn,
					type: 'modify'
				});
			})
			return () => {
				this.socket.disconnect();
			  };
		})
	}

	public joinRoom = () => {
		return Observable.create((observer) => {
			this.socket.on('joinRoomResponse', (response, roomname) => {
				// console.log('connected to ' + roomname)
				this.room = roomname;
				observer.next(roomname);
				})
		});

		
	}
	deleteRoom(roomname) {
		this.socket.emit('deleteRoom',roomname);
	}
	public getMessages = () => {
		return Observable.create((observer) => {
			this.socket.on('roomMessageResponse', (message) => {
				observer.next(message);
				console.log(message)
			});
		});
	}
}