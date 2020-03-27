import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

export class ChatService {
    private url = 'http://localhost:3000';
    private socket;

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

    public joinRoom() {

        this.socket.emit('test1');

        // this.socket.join('some room', () => {
        //     console.log("connected")
        // });

        // io.on('connection', function(socket){
        //     socket.join('some room');
        //   });
    }

    public test2() {
        this.socket.emit('test2');
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });
    }
}