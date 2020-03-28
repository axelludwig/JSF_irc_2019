import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	username: string;
	title = "chat";

	constructor(private chatService: ChatService) {
	}


	saveUsername(username) {
		if (username == "") {
			alert("choose a username")
		} else {
			this.chatService.socket.emit('usernameIsAvailable', username);
			this.chatService.socket.on('usernameIsAvailableResponse', (boolean) => {
				if (boolean.toString() == 'true') {
					console.log('dfkdfkj')
					this.username = username;
					this.chatService.saveUsername(username)
				} else {
					alert("this username is already taken")
				}
			})
		}
	}

	ngOnInit() {

	}
}