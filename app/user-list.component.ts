import {Component, OnInit, Output, EventEmitter} from "angular2/core";
import {NgClass} from "angular2/common";
import {Observable} from "rxjs/Rx";
import {SocketService} from "./socket.service";
import {Event$Service} from "./event$.service";

@Component({
    selector: "user-list",
    template: `
            <p>Select:</p>
            <p *ngFor="#user of userslist" (click)="selectChatTarget(user)" [ngClass]="{selected: isSelected(user)}">{{user}}</p>
       `,
    styles: [`
        .selected {
            background-color: #EEE;
            color: #369;
        }
    `],
    directives: [NgClass]
})
export class UserList implements OnInit {
    
    selectedUser: string = "Everyone";
    userslist: string[] = ["Everyone"];

    constructor(private socketService_: SocketService, private events_: Event$Service) {
        this.events_.subscribe("socket-disconnect", (data) => { console.log("Socket disconnect event emitted."); this.userslist = ["Everyone"]; } );
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

    isSelected(user: string) {
        return this.selectedUser == user;
    }

    selectChatTarget(user: string) {
        this.selectedUser = user;
        this.events_.emit("select-chat-target", user);
    }
}