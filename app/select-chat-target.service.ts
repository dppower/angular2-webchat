import {EventEmitter} from "angular2/core";

export class SelectChatTargetEvents {
    Emitter: EventEmitter<string> = new EventEmitter();

    constructor() { }

    emit(event: string) {
        this.Emitter.emit(event);
    }

    subscribe(callback) {
        return this.Emitter.subscribe(callback);
    }
}