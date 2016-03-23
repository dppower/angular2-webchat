import {Component, Output, EventEmitter, OnInit} from "angular2/core";
import {RepeatFocus} from "./repeat-focus.directive";
import {LogoutComponent} from "./logout.component";
import {SocketService} from "./socket.service";
import {Event$Service} from "./event$.service";
import {AuthService} from "./auth.service";

@Component({
    selector: "chat-input",
    templateUrl: "app/templates/chat-input.component.html",
    styleUrls: ["app/styles/input-box-error.css"],
    directives: [RepeatFocus, LogoutComponent]
})
export class ChatInput implements OnInit {
    errorMessage: string = "";
    username: string;
    message: string;
    chatTarget: string = "Everyone";
    active: boolean = true;

    constructor(private socketService_: SocketService, private events_: Event$Service, private authSerivce_: AuthService) {
        this.events_.subscribe("select-chat-target", this.setChatTarget);
    };

    ngOnInit() {
        this.username = this.authSerivce_.username;
    }

    setChatTarget = (target: string) => {
        this.chatTarget = target;
    };

    sendMessage() {
        this.errorMessage = "";
        if (this.message == "" || this.chatTarget == undefined) {
            return;
        }
        else if (this.chatTarget == this.username) {
            this.errorMessage = "Please select a target not yourself!";

            this.active = false;
            setTimeout(() => { this.active = true; this.events_.emit("refocus"); }, 0);
            return;
        }
        else if (this.chatTarget == "Everyone") {
            this.socketService_.emit("chat", { message: this.message });
        } else {
            this.socketService_.emit("whisper", { target: this.chatTarget, message: this.message });
        }
        this.message = "";
        this.active = false;
        setTimeout(() => { this.active = true; this.events_.emit("refocus"); }, 0);
    };
}