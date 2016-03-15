import {Component, Output, EventEmitter} from "angular2/core";
import {RepeatFocus} from "./repeat-focus.directive";
import {RefocusEvents} from "./refocus-event.service";
import {LogoutComponent} from "./logout.component";
import {SocketService} from "./socket.service";

@Component({
    selector: "chat-input",
    templateUrl: "app/templates/chat-input.component.html",
    directives: [RepeatFocus, LogoutComponent],
    providers: [RefocusEvents]
})
export class ChatInput {
    message: string;

    active: boolean = true;

    constructor(private refocusEmitter: RefocusEvents, private socketService: SocketService) { };

    sendMessage() {
        if (this.message != "")
        {
            this.socketService.emit("chat", { message: this.message });
        }
        this.message = "";
        //this.active = false;
        //setTimeout(() => this.active = true, 0);
        this.refocusEmitter.emit("refocus");
    }
}