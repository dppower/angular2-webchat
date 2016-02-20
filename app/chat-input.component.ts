import {Component, Output, EventEmitter} from "angular2/core";
import {RepeatFocus} from "./repeat-focus.directive";

@Component({
    selector: "chat-input",
    template: `
        <div class="row">
            <form *ngIf="active" (ngSubmit)="sendMessage()" #thisForm="ngForm" autocomplete="off" novalidate>
                <div class="col-xs-8 col-sm-9">
                    <input type="text" id="message-box" class="form-control input-lg" [(ngModel)]="message" required ngControl="newMsg" placeholder="Enter a new message..." repeatFocus autofocus="true">
                </div>
                <div class="col-xs-4 col-sm-3">
                    <button type="submit" class="btn btn-primary btn-lg btn-block">Send</button>
                </div>
            </form>
        </div>
    `,
    directives: [RepeatFocus]
})
export class ChatInput {
    message: string;
    @Output() addNewMessage: EventEmitter<string> = new EventEmitter<string>();
    @Output() refocusEvent: EventEmitter<any> = new EventEmitter<any>();

    active: boolean = true;

    sendMessage() {
        if (this.message != "")
        {
            this.addNewMessage.emit(this.message);
        }
        this.message = "";
        //this.active = false;
        //setTimeout(() => this.active = true, 0);
        this.refocusEvent.emit(null);
    }
}