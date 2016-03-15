import {Component, OnInit, Output, EventEmitter} from "angular2/core";
import {Observable} from "rxjs/Rx";
import {SocketService} from "./socket.service";
import {SelectChatTargetEvents} from "./select-chat-target.service";

@Component({
    selector: "user-list",
    template: `
         <div class="user-list col-xs-4 col-sm-3">
            <p *ngFor="#user of userslist" (click)="selectChatTarget(user)">{{user}}</p>
        </div>
       `
})
export class UserList implements OnInit {
    
    userslist: string[] = ["Everyone"];

    constructor(private socketService_: SocketService, private chatTargetEvent: SelectChatTargetEvents) { };

    ngOnInit() {
        this.socketService_.userList$.subscribe((userAction) => {
            if (userAction.action == "add") {
                this.userslist.push(userAction.username);
            } else if (userAction.action == "remove") {
                this.userslist = this.userslist.filter(username => username != userAction.username);
            }
        });
    };

    selectChatTarget(user: string) {
        console.log("new user selected: " + user);
        this.chatTargetEvent.emit(user);
    }
}