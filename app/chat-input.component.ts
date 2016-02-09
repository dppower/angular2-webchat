import {Component, Output, EventEmitter} from 'angular2/core'

@Component({
    selector: 'chat-input',
    template: `
        <div>
            <input type="text" id="message-box" [(ngModel)]="message">
            <button id="send-message-btn" (click)="sendMessage()">Send</button>
        </div>
    `
})
export class ChatInput {
    message: String = "";
    @Output() addNewMessage: EventEmitter<any> = new EventEmitter();

    sendMessage() {
        this.addNewMessage.emit(this.message);
    }
}