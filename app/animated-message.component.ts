import {Component, Input} from "angular2/core";

@Component({
    selector: "animated-message",
    template: `
               <label id="animated-message">{{message}}</label>
            `,
    styleUrls: ["app/styles/response-message.css"]
})
export class AnimatedMessage {
    @Input() message: string;
}