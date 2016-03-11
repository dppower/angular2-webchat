import {Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy, SimpleChange} from 'angular2/core';
import {AsyncPipe} from "angular2/common";
import * as rx from "rxjs/Rx";
import {ChatDisplay} from './chat-display.component';
import {ChatInput} from './chat-input.component';
import {ChatMessage} from "./chat-message";
import {UserList} from "./user-list.component";
import {AutoScroll} from "./auto-scroll.directive";
import {ScrollEvents} from "./scroll-event.service";
import {SocketService} from "./socket-service";

@Component({
    templateUrl: "app/templates/chatroom.component.html",
    directives: [ChatDisplay, ChatInput, UserList, AutoScroll],
    providers: [ScrollEvents, SocketService],
    pipes: [AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatRoomComponent implements OnInit {
    
    messages: rx.Observable<string[]>;
    //userslist: string[];
    //usersReplay: rx.ReplaySubject<string>;

    constructor(private scrollEvent: ScrollEvents, private socketService_: SocketService) {
        //this.usersReplay = new rx.ReplaySubject<string>();
        //rx.Observable.merge<{ name: string, socket: string }>(this.socketService_.userListrp, this.socketService_.newUser).map(x => x.name);
        
        //this.userslist = this.socketService_.userListrp.concat<{ name: string, socket: string }>(this.socketService_.newUser).map(user => Array<string>(user.name)).scan<string[]>((i, j) => i.concat(j));

        //this.socketService_.userDisconnected
        //    .subscribe(name => {

                //this.userslist = this.socketService_.userListrp.merge(this.socketService_.newUser).filter(e => e != name).map(user => Array<string>(user.name)).scan<string[]>((i, j) => i.concat(j));;
                //rx.Observable.concat(this.usersList.last(), 
                //this.usersList = this.usersReplay.filter(e => e != name).map(user => Array<string>(user))
                //    .scan<string[]>((i, j) => i.concat(j));
                
                //this.usersList = this.usersList.map(array => array.filter(e => nameArray.indexOf(e) === -1));
            //});
        
    };

    ngOnInit() {
        this.socketService_.connect();
        this.messages = this.socketService_.chatStream
            .map(chat => Array(chat))
            .scan<string[]>((i, j) => i.concat(j));
        this.messages.subscribe(msg => this.scrollEvent.emit("scroll"));
    }

    emitMessage(msg) {
        this.socketService_.emit("chat", msg);
    }
}