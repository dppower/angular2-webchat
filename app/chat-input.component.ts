import {Component, Output, EventEmitter} from "angular2/core";

@Component({
    selector: "chat-input",
    template: `
        <div class="row">
            <div class="col-xs-8 col-sm-9">
                <input type="text" id="message-box" class="form-control input-lg" [(ngModel)]="message" required>
            </div>
            <div class="col-xs-4 col-sm-3">
                <button id="send-message-btn" class="btn btn-primary btn-lg btn-block" (click)="sendMessage()">Send</button>
            </div>
        </div>
    `
})
export class ChatInput {
    message: string = "Enter a new message...";
    @Output() addNewMessage: EventEmitter<string> = new EventEmitter<string>();

    sendMessage() {
        this.addNewMessage.emit(this.message);
        this.message = "";
    }
}