import {Component, Output, EventEmitter} from "angular2/core";
import {RepeatFocus} from "./repeat-focus.directive";
import {RefocusEvents} from "./refocus-event.service";
import {LoginService} from "./login.service";
import {SocketService} from "./socket-service";
import {Router} from "angular2/router";

@Component({
    selector: "chat-input",
    template: `
        <div class="row">
            <form *ngIf="active" (ngSubmit)="sendMessage()" #thisForm="ngForm" autocomplete="off" novalidate>
                <div class="col-xs-6 col-sm-8">
                    <input type="text" id="message-box" class="form-control input-lg" [(ngModel)]="message" required ngControl="newMsg" placeholder="Enter a new message..." repeatFocus>
                </div>
                <div class="col-xs-3 col-sm-2">
                    <button type="submit" class="btn btn-primary btn-lg btn-block">Send</button>
                </div>
                <div class="col-xs-3 col-sm-2">
                    <button type="button" class="btn btn-primary btn-lg btn-block" (click)="logout()">Logout</button>
                </div>
            </form>
        </div>
    `,
    directives: [RepeatFocus],
    providers: [RefocusEvents]
})
export class ChatInput {
    message: string;
    @Output() addNewMessage: EventEmitter<string> = new EventEmitter<string>();

    active: boolean = true;

    constructor(private refocusEmitter: RefocusEvents, private loginService_: LoginService, private socketService_: SocketService, private router_: Router) { }

    sendMessage() {
        if (this.message != "")
        {
            this.addNewMessage.emit(this.message);
        }
        this.message = "";
        //this.active = false;
        //setTimeout(() => this.active = true, 0);
        this.refocusEmitter.emit("refocus");
    }

    logout() {
        this.loginService_.logout().subscribe();
        this.socketService_.disconnect();
        this.router_.navigate(["Login"]);
    };
}