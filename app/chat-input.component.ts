import {Component, Output, EventEmitter} from "angular2/core";

@Component({
    selector: "chat-input",
    template: `
        <div class="row">
            <form *ngIf="active" (ngSubmit)="sendMessage()" #thisForm="ngForm" autocomplete="off" novalidate autofocus="true">
                <div class="col-xs-8 col-sm-9">
                    <input type="text" id="message-box" class="form-control input-lg" (click)="clearInput()" [(ngModel)]="message" required ngControl="newChat" #chat="ngForm">
                </div>
                <div class="col-xs-4 col-sm-3">
                    <button type="submit" id="send-message-btn" class="btn btn-primary btn-lg btn-block" [disabled]="!thisForm.form.valid">Send</button>
                </div>
            </form>
        </div>
    `
})
export class ChatInput {
    message: string = "Enter a new message...";
    @Output() addNewMessage: EventEmitter<string> = new EventEmitter<string>();

    active: boolean = true;

    sendMessage() {
        if (this.message != "")
        {
            this.addNewMessage.emit(this.message);
        }
        this.message = "";
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    clearInput() {
        this.message = "";
    }
}