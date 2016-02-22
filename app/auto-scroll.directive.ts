import {Directive, ElementRef, OnDestroy} from "angular2/core";
import {ScrollEvents} from "./scroll-event.service";

@Directive({
    selector: "[autoScroll]"
})
export class AutoScroll implements OnDestroy {

    subscription: any;

    constructor(private elem: ElementRef, private eventEmitter: ScrollEvents) {
        this.subscription = this.eventEmitter.subscribe((data) => this.scroll(data));
    }

    scroll(event) {
        this.elem.nativeElement.scrollTop = this.elem.nativeElement.scrollHeight - this.elem.nativeElement.clientHeight;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}