import {Component} from "angular2/core";
import {Input} from "angular2/core";

@Component({
    selector: "chat-display",
    template: `
        <p>{{message}}</p>
    `
})
export class ChatDisplay {
    @Input() message: string;
}