import {EventEmitter} from "angular2/core";

export class RefocusEvents {
    refocusEmitter: EventEmitter<string> = new EventEmitter();

    constructor() { }

    emit(event: string) {
        this.refocusEmitter.emit(event);
    }

    subscribe(callback) {
        return this.refocusEmitter.subscribe(callback);
    }
}