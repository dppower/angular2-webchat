import {Component, OnInit} from "angular2/core";
import {Observable} from "rxjs/Rx";
import {SocketService} from "./socket.service";

@Component({
    selector: "user-list",
    template: `
         <div class="user-list col-xs-4 col-sm-3">
            <p *ngFor="#user of userslist">{{user}}</p>
        </div>
       `
})
export class UserList implements OnInit {

    userslist: string[] = [];

    constructor(private socketService_: SocketService) { };

    ngOnInit() {
        this.socketService_.userList$.subscribe((userAction) => {
            if (userAction.action == "add") {
                this.userslist.push(userAction.username);
            } else if (userAction.action == "remove") {
                this.userslist = this.userslist.filter(username => username != userAction.username);
            }
        });
    };
}