import {Component} from 'angular2/core'
import {ChatInput} from './chat-input.component';
import {SocketService} from './socket-service';

@Component({
    selector: 'chat-display',
    template: `
        <p *ngFor='#msg of messages'>{{msg}}</p>
        <chat-input (addNewMessage)="addMessageToArray($event)"></chat-input>
    `,
    directives: [ChatInput]
})
export class ChatDisplay {
    constructor(private socket_: SocketService) {
        this.socket_.socket.on('chat', function (msg) {
            this.messages.push(msg);
        });
    };

    messages: String[] = [];

    addMessageToArray(msg) {
        this.messages.push(msg);
        this.socket_.socket.emit('chat', msg);
    }
}