import {Component, OnInit} from 'angular2/core';
import {ChatDisplay} from './chat-display.component';
import {ChatInput} from './chat-input.component';
import {UserList} from "./user-list.component";
import {SocketService} from "./socket.service";
import {Event$Service} from "./event$.service";

@Component({
    templateUrl: "app/templates/chatroom.component.html",
    directives: [ChatDisplay, ChatInput, UserList],
    providers: [SocketService, Event$Service]
})
export class ChatRoomComponent implements OnInit {
    
    constructor(private socketService_: SocketService) { };

    ngOnInit() {
        this.socketService_.connect(); 
    }
}