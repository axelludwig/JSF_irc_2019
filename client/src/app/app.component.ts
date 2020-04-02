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
  users: any[] = [];
  constructor(private chatService: ChatService) {
  }

  saveUsername(username) {
    if (username == "") alert("choose a username")
    else {
      this.chatService.socket.emit('usernameIsAvailable', username);
      this.chatService.socket.on('usernameIsAvailableResponse', (isAvailable) => {
        if (isAvailable) {
          this.username = username;
          this.chatService.socket.emit('connectUser', username)
          // this.chatService.saveUsername(username)
          this.chatService.username = username;
        } else alert("this username is already taken")
      })
    }
  }

  getUsers() {
    this.chatService.socket.emit('getConnectedUsers');
    this.chatService.socket.on('getUsersResponse', (users) => {
      this.users = users;
    });
  }

  ngOnInit() {
    this.getUsers();

    this.chatService
      .getNewConnectedUser()
      .subscribe((user) => {
        if ('add' == user.type) {
          this.users.push({
            name: user.username
          })
        } else {
          let index; for (let i = 0; i < this.users.length; ++i) {
            if (user.username == this.users[i].name) {
              index = i;
            }
          }; this.users.splice(index, 1)
        }
      });
  }
}