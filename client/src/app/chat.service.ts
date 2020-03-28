import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

export class ChatService {
    private url = 'http://localhost:3000';
    public socket;
    public us:[];
    public isAvailable = false;

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public createRoom(roomname) {
        this.socket.emit('createRoom', roomname);
    }

    public saveUsername(username) {
        this.socket.emit('saveUsername', username)
    }

    public getUsers(){
        this.socket.emit('getUsers');
        this.socket.on('getUsersResponse', (users) => {
            this.us = users;
        });
    }
    public testUsername() {

    }

    isAvailableUsername(username) {
        this.socket.emit('usernameIsAvailable', username);
        this.socket.on('usernameIsAvailableResponse', (boolean) => {
            this.isAvailable = boolean
        })
    }




    public joinRoom() {



    }

    public test2() {

    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
            this.socket.on('getConnectedUsers', (users) => {
                console.log(users)
            })
        });
    }
}