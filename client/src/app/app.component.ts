import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string;
  
  constructor(private chatService: ChatService) {
  }

 
  saveUsername(username) {
    if(username == "")
    {
      alert("a name pls")
    }
    else{
      this.username = username;
      console.log(this.username);
    }
  }

  ngOnInit() {
    
  }
}

// TypeError: this.socket.join is not a function