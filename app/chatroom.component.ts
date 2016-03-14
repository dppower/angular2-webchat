import {Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy, SimpleChange} from 'angular2/core';
import {AsyncPipe} from "angular2/common";
import {Observable} from "rxjs/Rx";
import {ChatDisplay} from './chat-display.component';
import {ChatInput} from './chat-input.component';
import {UserList} from "./user-list.component";
import {AutoScroll} from "./auto-scroll.directive";
import {ScrollEvents} from "./scroll-event.service";
import {SocketService} from "./socket-service";

@Component({
    templateUrl: "app/templates/chatroom.component.html",
    directives: [ChatDisplay, ChatInput, UserList, AutoScroll],
    providers: [ScrollEvents, SocketService],
    pipes: [AsyncPipe],
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatRoomComponent implements OnInit {
    
    messages: Observable<string[]>;
    userslist: string[] = [];

    constructor(private scrollEvent: ScrollEvents, private socketService_: SocketService) { };

    ngOnInit() {
        this.socketService_.connect();
        this.messages = this.socketService_.chatStream
            .map(chat => Array(chat.username + ": " + chat.message))
            .scan<string[]>((i, j) => i.concat(j));

        this.messages.subscribe(msg => this.scrollEvent.emit("scroll"));

        this.socketService_.userList.subscribe((userAction) => {
            if (userAction.action == "add") {
                this.userslist.push(userAction.username);
            } else if (userAction.action == "remove") {
                this.userslist = this.userslist.filter(username => username != userAction.username);
            }
        });
    }

    emitMessage(msg) {
        this.socketService_.emit("chat", msg);
    }
}