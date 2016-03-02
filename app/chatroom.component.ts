import {Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy, SimpleChange} from 'angular2/core';
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
                    <p *ngFor="#msg of messages | async">{{msg}}</p>
                </div>
                <div class="user-list col-xs-4 col-sm-3">
                    <p *ngFor="#user of userslist | async">{{user}}</p>
                </div>
            </div>
        </div>
        <div class="footer">
            <chat-input (addNewMessage)="emitMessage($event)"></chat-input>
        </div>
    `,
    directives: [ChatDisplay, ChatInput, UserList, AutoScroll],
    providers: [ScrollEvents],
    pipes: [AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatRoomComponent implements OnInit {
    
    messages: rx.Observable<string[]>;
    userslist: rx.Observable<string[]>;
    usersReplay: rx.ReplaySubject<string>;

    constructor(private socketService_: SocketService, private scrollEvent: ScrollEvents) {
        this.usersReplay = new rx.ReplaySubject<string>();
        rx.Observable.merge<{ name: string, socket: string }>(this.socketService_.userList, this.socketService_.newUser).map(x => x.name).subscribe(this.usersReplay);
        
        this.userslist = this.usersReplay.map(user => Array<string>(user)).scan<string[]>((i, j) => i.concat(j));

        //this.socketService_.userDisconnected
        //    .subscribe(name => {

        //        //rx.Observable.concat(this.usersList.last(), 
        //        //this.usersList = this.usersReplay.filter(e => e != name).map(user => Array<string>(user))
        //        //    .scan<string[]>((i, j) => i.concat(j));

        //        //this.usersList = this.usersList.map(array => array.filter(e => nameArray.indexOf(e) === -1));
        //    });
        
    };

    ngOnInit() {
        this.messages = this.socketService_.chatStream
            .map(chat => Array(chat.clientId + ": " + chat.message))
            .scan<string[]>((i, j) => i.concat(j));
        this.messages.subscribe(msg => this.scrollEvent.emit("scroll"));
    }

    emitMessage(msg) {
        var chat = new ChatMessage(msg, this.socketService_.socketId);
        this.socketService_.emitMessage(chat);
    }
}