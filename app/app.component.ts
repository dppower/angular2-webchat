import {Component} from 'angular2/core';
import {SocketService} from './socket-service';
import {ChatDisplay} from './chat-display.component';
import {ChatInput} from './chat-input.component';

@Component({
    selector: "my-app",
    template: `
        <div class="wrap">
            <div class="container-fluid">
                <h2>Webchat</h2>
                <chat-display *ngFor="#msg of messages" [message]="msg"></chat-display>
                <div class="push"></div>
            </div>
        </div>
        <footer class="footer">
            <div class="container-fluid">
                <chat-input (addNewMessage)="emitMessage($event)"></chat-input>
            </div>
        </footer>
    `,
    directives: [ChatDisplay, ChatInput],
    providers: [SocketService]
})
export class AppComponent {
    messages: string[] = [];

    constructor(public socket_: SocketService) {
        this.socket_.socket.on('chat', data => {
            var chat: string = data.clientId + ": " + data.message;
            this.messages.push(chat);
        });
    };
    
    emitMessage(msg) {
        this.messages.push(this.socket_.socket.id + ": " + msg);
        var chat = { message: msg, clientId: this.socket_.socket.id };
        this.socket_.socket.emit('chat', chat);
    }
}