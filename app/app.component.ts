import {Component, OnInit} from 'angular2/core';
import {SocketService} from './socket-service';
import {ChatDisplay} from './chat-display.component';
import {ChatInput} from './chat-input.component';
import {ChatMessage} from "./chat-message";

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
export class AppComponent implements OnInit {
    messages: string[] = [];

    constructor(private socketService_: SocketService) { };
    
    ngOnInit() {
        this.socketService_.chatStream.subscribe(data => {
            var chat = data.clientId + ": " + data.message;
            this.messages.push(chat);
        });
    }

    emitMessage(msg) {
        var chat: ChatMessage = { message: msg, clientId: this.socketService_.socketId };
        this.socketService_.emitMessage(chat);
    }
}