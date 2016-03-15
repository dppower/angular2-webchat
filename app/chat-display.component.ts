import {Component, Input, ChangeDetectionStrategy, OnInit} from "angular2/core";
import {AsyncPipe} from "angular2/common";
import {Observable} from "rxjs/Rx";
import {AutoScroll} from "./auto-scroll.directive";
import {SocketService} from "./socket.service";
import {ScrollEvents} from "./scroll-event.service";

@Component({
    selector: "chat-display",
    template: `
         <div class="chat-box col-xs-8 col-sm-9" autoScroll>
            <p *ngFor="#msg of messages | async">{{msg}}</p>
        </div>
       `,
    directives: [AutoScroll],
    providers: [ScrollEvents],
    pipes: [AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatDisplay implements OnInit {

    messages: Observable<string[]>;

    constructor(private scrollEvent: ScrollEvents, private socketService_: SocketService) { };

    ngOnInit() {
        let whispers = this.socketService_.whisper$
            .map(chat => "[" + chat.username + "]: " + chat.message);

        let chats = this.socketService_.chat$
            .map(chat => chat.username + ": " + chat.message);

        this.messages = chats.merge(whispers)
            .map(message => Array(message))
            .scan<string[]>((i, j) => i.concat(j));

        this.messages.subscribe(message => this.scrollEvent.emit("scroll"));
    };
}