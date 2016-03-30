import {Component, Input} from "angular2/core";

@Component({
    selector: "response-message",
    template: `
               <span id="response-message">{{message}}</span>
            `,
    styleUrls: ["app/styles/response-message.css"]
})
export class AnimatedMessage {
    @Input() message: string;
}