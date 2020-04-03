import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: any[] = [];

  constructor(private chatService: ChatService) { }

  getrooms() {
    this.chatService.socket.emit('getRooms');
    this.chatService.socket.on('getRoomsResponse', (rooms, length) => {
      this.rooms = rooms
    });
  }

  leaveRoom(roomname) {
    this.chatService.socket.emit('leaveRoom', roomname);
		this.chatService.socket.on('leaveRoomResponse', (response) => {
			console.log('disconnected from ' + roomname)
			this.chatService.room = '';
		})
  }

  createRoom(roomname) {
    console.log('i')
    if (roomname == "") alert("choose a roomname")
    else {
      var available = true;
      this.rooms.map((n) => { if (roomname == n.name) available = false; });
      if (available) {
        this.chatService.socket.emit('createRoom', roomname)
      } else
          alert("this roomname is already taken")
    }

  }

  deleteRoom(roomname) {
    if (roomname == "") alert("choose a username")
    else {
      this.chatService.socket.emit('roomnameIsAvailable', roomname);
      this.chatService.socket.on('roomnameIsAvailableResponse', (isAvailable) => {
        if (isAvailable) this.chatService.socket.emit('deleteRoom', roomname);
        else alert("this roomname is already taken")
      })
    } return;
  }

  modifyRoom(roomname, newName) {
    if (roomname == "") alert("choose a username")
    else {
      this.chatService.socket.emit('roomnameIsAvailable', roomname);
      this.chatService.socket.on('roomnameIsAvailableResponse', (isAvailable) => {
        if (isAvailable) this.chatService.socket.emit('modifyRoom', roomname, newName);
        else alert("this roomname is already taken")
      })
    } return;
  }

  ngOnInit(): void {
    this.getrooms();
    this.chatService
      .getNewRoom()
      .subscribe((room) => {
        if ('add' == room.type){
          this.rooms.push({ name: room.name })
          console.log("hello")
          console.log(room.name);
        } 
        
        else if (room.type == 'modify') {
          let index;
          for (let i = 0; i < this.rooms.length; ++i) if (room.name == this.rooms[i].name) index = i;
          this.rooms[index].name = room.newName;
        }
        else {
          let index;
          for (let i = 0; i < this.rooms.length; ++i) if (room.name == this.rooms[i].name) index = i;
          this.rooms.splice(index, 1)
        }
      });
  }
  

}
