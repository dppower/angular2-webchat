import {Directive, ElementRef, OnDestroy} from "angular2/core";
import {RefocusEvents} from "./refocus-event.service";

@Directive({
    selector: "[repeatFocus]",
})
export class RepeatFocus implements OnDestroy {

    subscription: any;

    constructor(private elem: ElementRef, private eventEmitter: RefocusEvents) {
        this.subscription = this.eventEmitter.subscribe((data) => this.focus(data));
    }
    
    focus(event) {
        this.elem.nativeElement.focus();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}