import {Component, OnInit, EventEmitter, Output} from 'angular2/core';
import { AsyncPipe } from "angular2/common";
import * as rx from "rxjs/Rx";
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
                    <p *ngFor="#msg of messages">{{msg}}</p>
                </div>
                <div class="user-list col-xs-4 col-sm-3">
                    <p *ngFor="#user of users">{{user.name}}</p>
                </div>
            </div>
        </div>
        <div class="footer">
            <chat-input (addNewMessage)="emitMessage($event)"></chat-input>
        </div>
    `,
    directives: [ChatDisplay, ChatInput, UserList, AutoScroll],
    providers: [ScrollEvents],
    pipes: [AsyncPipe]
})
export class ChatRoomComponent implements OnInit {
    messages: string[] = [];
    userslist: rx.Observable<{ name: string, socket: string }>;
    users: { name: string, socket: string }[] = [];

    constructor(private socketService_: SocketService, private scrollEvent: ScrollEvents) {
        this.userslist = this.socketService_.newUser.merge(this.socketService_.userList);

        this.socketService_.userDisconnected.subscribe(name => {
            this.users = this.users.filter(obj => obj.name != name);
        });
        
    };

    ngOnInit() {
        this.socketService_.chatStream.subscribe(chat => { this.messages.push(chat.clientId + ": " + chat.message); });
        this.userslist.subscribe(user => this.users.push(user));
    }

    emitMessage(msg) {
        var chat = new ChatMessage(msg, this.socketService_.socketId);
        this.socketService_.emitMessage(chat);
        this.scrollEvent.emit("scroll");
    }
}