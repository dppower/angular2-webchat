import {Directive, ElementRef, OnDestroy, OnInit} from "angular2/core";
import {RefocusEvents} from "./refocus-event.service";

@Directive({
    selector: "[repeatFocus]",
})
export class RepeatFocus implements OnDestroy, OnInit {

    subscription: any;

    constructor(private elem: ElementRef, private eventEmitter: RefocusEvents) {
        this.subscription = this.eventEmitter.subscribe((data) => this.focus(data));
    }
    
    ngOnInit() {
        this.focus("initial-focus");
    }

    focus(event) {
        this.elem.nativeElement.focus();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}