import {Component} from "angular2/core";
import {AuthService} from "./auth.service";
import {Router} from "angular2/router";
import {SocketService} from "./socket.service";

@Component({
    selector: "logout",
    template: `
                <div class="col-xs-2">
                    <button type="button" class="btn btn-primary btn-lg btn-block" (click)="logout()">Logout</button>
                </div>
        `
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