import {Component, OnInit, EventEmitter, Output} from 'angular2/core';
import {SocketService} from './socket-service';
import {ChatDisplay} from './chat-display.component';
import {ChatInput} from './chat-input.component';
import {ChatMessage} from "./chat-message";
import {UserList} from "./user-list.component";
import {AutoScroll} from "./auto-scroll.directive";
import {ScrollEvents} from "./scroll-event.service";

@Component({
    template: `
        <div class="wrap">
            <div class="row">
                <div class="col-sm-9">
                    <h3>Chatroom</h3>
                </div>
                <div class="col-sm-3">
                    <h3>Users</h3>
                </div>
            </div>
            <div class="row">
                <div class="chat-box col-xs-8 col-sm-9" autoScroll>
                    <chat-display *ngFor="#msg of messages" [message]="msg"></chat-display>
                </div>
                <div class="user-list col-xs-4 col-sm-3">
                    <user-list [users]="UserList"></user-list>
                </div>
            </div>
        </div>
        <div class="footer">
            <chat-input (addNewMessage)="emitMessage($event)"></chat-input>
        </div>
    `,
    directives: [ChatDisplay, ChatInput, UserList, AutoScroll],
    providers: [ScrollEvents]
})
export class ChatRoomComponent implements OnInit {
    messages: string[] = [];
    UserList: string[] = ["David", "Ann"];

    constructor(private socketService_: SocketService, private scrollEvent: ScrollEvents) { };
    
    ngOnInit() {
        this.socketService_.chatStream.subscribe(data => {
            var chat = data.clientId + ": " + data.message;
            this.messages.push(chat);
            this.scrollEvent.emit("scroll");
        });
    }

    emitMessage(msg) {
        var chat = new ChatMessage(msg, this.socketService_.socketId);
        this.socketService_.emitMessage(chat);
    }
}