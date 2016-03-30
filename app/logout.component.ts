import {Component} from "angular2/core";
import {AuthService} from "./auth.service";
import {Router} from "angular2/router";
import {SocketService} from "./socket.service";

@Component({
    selector: "logout",
    template: `
    <button type="button" class="chat-button" (click)="logout()">Logout</button>
    `,
    styles: [`
    .chat-button {
        margin-left: 1em;
        float: left;
        width: calc(20% - 1em);
        height: 3em;
    }
    `],
})
export class LogoutComponent {

    constructor(
        private authService_: AuthService,
        private socketService_: SocketService,
        private router_: Router
    ) { };

    logout() {
        this.authService_.logout().subscribe();
        this.socketService_.disconnect();
        this.router_.navigate(["Login"]);
    };
}