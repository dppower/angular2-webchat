import {Component, Output, EventEmitter} from "angular2/core";
import {RepeatFocus} from "./repeat-focus.directive";
import {RefocusEvents} from "./refocus-event.service";
import {LogoutComponent} from "./logout.component";
import {SocketService} from "./socket.service";
import {SelectChatTargetEvents} from "./select-chat-target.service";

@Component({
    selector: "chat-input",
    templateUrl: "app/templates/chat-input.component.html",
    directives: [RepeatFocus, LogoutComponent],
    providers: [RefocusEvents]
})
export class ChatInput {
    message: string;
    chatTarget: string = "Everyone";
    active: boolean = true;

    constructor(
        private refocusEmitter: RefocusEvents,
        private socketService: SocketService,
        private chatTargetEvent: SelectChatTargetEvents
        ) {
        this.chatTargetEvent.subscribe(this.setChatTarget);
    };

    setChatTarget = (target: string) => {
        console.log("Chat input received a new target: " + target);
        this.chatTarget = target;
        console.log("Chat target is now: " + this.chatTarget);
    };

    sendMessage() {
        if (this.message == "") {
            return;
        }
        console.log("While sending message Chat target is now: " + this.chatTarget);
        if (this.chatTarget == "Everyone") {
            console.log("Emiting chat to Everyone " + JSON.stringify({ message: this.message }));
            this.socketService.emit("chat", { message: this.message });
        } else {
            console.log("Emiting whisper to: " + JSON.stringify({ target: this.chatTarget, message: this.message }));
            this.socketService.emit("whisper", { target: this.chatTarget, message: this.message });
        }
        this.message = "";
        //this.active = false;
        //setTimeout(() => this.active = true, 0);
        this.refocusEmitter.emit("refocus");
    };
}