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
			this.chatService.isAvailableUsername(username);
			setTimeout(() => {
				if (this.chatService.isAvailable) {
					this.username = username;
					this.chatService.saveUsername(username)
				} else {
					alert("this username is already taken")
				}
			}, 100);
		}
	}

	getUsers(){
		
		this.chatService.getUsers();

	}

	ngOnInit() {

	}
}