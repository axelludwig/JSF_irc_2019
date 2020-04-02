import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

	username: string;
	room: string;
	message: string;
	messages: string[] = [];
	title: string = "chat";

	constructor(private chatService: ChatService) {
		this.username = this.chatService.username;
	}

	sendMessage() {
		var object = {
			message: this.message,
			username: this.username,
			room: this.room
		}
		this.chatService.socket.emit('roomMessage', object);
		// this.message = '';
		// this.chatService.socket.on('roomMessageResponse', (object) => {
		// 	// this.message = res.
		// 	console.log('ok')
		// 	console.log(object)
		// })
	}

	createRoom(roomname) {
		if (roomname == "") alert("choose a username")
		else {
			this.chatService.socket.emit('roomnameIsAvailable', roomname);
			this.chatService.socket.on('roomnameIsAvailableResponse', (isAvailable) => {
				if (isAvailable) this.chatService.socket.emit('createRoom', roomname);
				else alert("this roomname is already taken")
			})
		} return;
	}

	joinRoom(roomname) {
		this.chatService.socket.emit('joinRoom', roomname);
		this.chatService.socket.on('joinRoomResponse', (response) => {
			console.log('connected to ' + roomname)
			this.room = roomname;
		})
	}

	test() {
		// this.chatService.joinRoom();
	}

	test2() {
		this.chatService.test2();
	}

	ngOnInit() {
		this.chatService
			.getMessages()
			.subscribe((message: string) => {
				this.messages.push(message);
			});
	}

}
