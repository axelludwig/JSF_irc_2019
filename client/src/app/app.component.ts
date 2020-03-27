import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
<<<<<<< HEAD
  message: string;
  messages: string[] = [];
  title: string = "chat";
  username: string;

=======
  username: string;
  
>>>>>>> peng
  constructor(private chatService: ChatService) {
  }

 
  saveUsername(username) {
<<<<<<< HEAD
    this.chatService.saveUsername(username)
=======
    if(username == "")
    {
      alert("a name pls")
    }
    else{
      this.username = username;
      console.log(this.username);
    }
>>>>>>> peng
  }

  ngOnInit() {
    
  }
}