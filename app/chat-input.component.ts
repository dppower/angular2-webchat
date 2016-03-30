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
    styles: [`
    #input-form {
        margin-top: 1em;
        margin-bottom: 1em;
        margin-left: 10%;
        width: 80%;
        display: block;
        height: 3em;
        clear: both;
    }
    #chat-input {
        width: 60%;
        float: left;
        height: 3em;
    }
    .chat-button {
        margin-left: 1em;
        float: left;
        width: calc(20% - 1em);
        height: 3em;
    }
    `],
    directives: [RepeatFocus, LogoutComponent]
})
export class ChatInput implements OnInit {
    errorMessage: string = "";
    username: string;
    message: string = "";
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
            this.errorMessage = "Please enter a valid message!"; 
        }
        else if (this.chatTarget == this.username) {
            this.errorMessage = "Please select a target not yourself!";  
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