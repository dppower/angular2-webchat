import {Component, Output, EventEmitter} from "angular2/core";
import {RepeatFocus} from "./repeat-focus.directive";
import {LogoutComponent} from "./logout.component";
import {SocketService} from "./socket.service";
import {Event$Service} from "./event$.service";

@Component({
    selector: "chat-input",
    templateUrl: "app/templates/chat-input.component.html",
    directives: [RepeatFocus, LogoutComponent]
})
export class ChatInput {
    message: string;
    chatTarget: string = "Everyone";
    active: boolean = true;

    constructor(private socketService_: SocketService, private events_: Event$Service) {
        this.events_.create("refocus");
        this.events_.subscribe("select-chat-target", this.setChatTarget);
    };

    setChatTarget = (target: string) => {
        this.chatTarget = target;
    };

    sendMessage() {
        if (this.message == "") {
            return;
        }
        if (this.chatTarget == "Everyone") {
            this.socketService_.emit("chat", { message: this.message });
        } else {
            this.socketService_.emit("whisper", { target: this.chatTarget, message: this.message });
        }
        this.message = "";
        //this.active = false;
        //setTimeout(() => this.active = true, 0);
        this.events_.emit("refocus", "focus");
    };
}