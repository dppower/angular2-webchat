import {Component, OnInit, Output, EventEmitter} from "angular2/core";
import {NgClass} from "angular2/common";
import {Observable} from "rxjs/Rx";
import {SocketService} from "./socket.service";
import {Event$Service} from "./event$.service";

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

    constructor(private socketService_: SocketService, private events_: Event$Service) {
        this.events_.create("select-chat-target");
    };

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
        this.events_.emit("select-chat-target", user);
    }
}