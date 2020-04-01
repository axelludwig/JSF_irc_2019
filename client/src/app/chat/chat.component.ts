import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

	message: string;
	messages: string[] = [];
	title: string = "chat";
	constructor(private chatService: ChatService) {
	}

	sendMessage() {
		this.chatService.sendMessage(this.message);
		this.message = '';
	}

	createRoom(roomname) {
		console.log('1')
		if (roomname == "") {
			alert("choose a username")
		} else {
			this.chatService.socket.emit('roomnameIsAvailable', roomname);
			this.chatService.socket.on('roomnameIsAvailableResponse', (isAvailable) => {
				console.log('2')
				// this.chatService.isAvailable = boolean
				if (isAvailable) {
					this.chatService.socket.emit('createRoom', roomname);
				} else {
					console.log('1')
					alert("this roomname is already taken")
				}
			})
		}
		return;
	}

	joinRoom(roomname) {
		this.chatService.socket.emit('joinRoom', roomname);
		this.chatService.socket.on('joinRoomResponse', (response) => {

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
