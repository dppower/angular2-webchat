import {EventEmitter} from "angular2/core";

export class ScrollEvents {
    scrollEmitter: EventEmitter<string> = new EventEmitter();

    constructor() { }

    emit(event: string) {
        this.scrollEmitter.emit(event);
    }

    subscribe(callback) {
        return this.scrollEmitter.subscribe(callback);
    }
}