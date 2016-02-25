import {Component, OnInit} from "angular2/core";
import {SocketService} from "./socket-service";
import {Router} from "angular2/router";

@Component({
    template: `
        <div>
            <input type="text" [(ngModel)]="inputName"/>
            <button (click)="goToChat()">Login!</button>
        </div>
    `

})
export class RegisterComponent implements OnInit {
    // To display a list of names previously used
    allUserNames: string[];

    inputName: string;

    constructor(private socketService_: SocketService, private router_: Router) { }

    // Need to check for previously used usernames
    ngOnInit() {
    }

    goToChat() {
        this.socketService_.emitName(this.inputName);
        this.router_.navigate(["Chat"]);
    }
};