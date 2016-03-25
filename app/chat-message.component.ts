import {Component, Input} from "angular2/core";
import {NgClass} from "angular2/common";

@Component({
    selector: "chat-message",
    template: `
    <p [ngClass]="type">{{message}}</p>
    `,
    styles: [`
    .whisper {
        color: rosybrown;
    }
    `],
    directives: [NgClass]
})
export class ChatMessageComponent {
    @Input() message;
    @Input() type;
}