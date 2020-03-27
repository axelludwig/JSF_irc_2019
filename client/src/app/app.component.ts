import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
    this.chatService.createRoom(roomname)
  }

  test() {
    this.chatService.joinRoom();
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

// TypeError: this.socket.join is not a function