import {Component, OnInit} from 'angular2/core';
import {ChatDisplay} from './chat-display.component';
import {ChatInput} from './chat-input.component';
import {UserList} from "./user-list.component";
import {SocketService} from "./socket.service";

@Component({
    templateUrl: "app/templates/chatroom.component.html",
    directives: [ChatDisplay, ChatInput, UserList],
    providers: [SocketService]
})
export class ChatRoomComponent implements OnInit {
    
    constructor(private socketService_: SocketService) { };

    ngOnInit() {
        this.socketService_.connect(); 
    }
}