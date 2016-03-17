import {Directive, ElementRef, OnDestroy} from "angular2/core";
import {Event$Service} from "./event$.service";
import {Subscription} from "rxjs/Rx";

@Directive({
    selector: "[autoScroll]"
})
export class AutoScroll implements OnDestroy {

    subscription: Subscription<string>;

    constructor(private elem: ElementRef, private events_: Event$Service) {
        // The onNext callback should use 'setTimeout' to delay it until the new message is added.
        this.subscription = this.events_.subscribe("auto-scroll", (data) => { setTimeout(() => this.scroll(data)); });
    }
    
    scroll(event: string) {
        this.elem.nativeElement.scrollTop = this.elem.nativeElement.scrollHeight - this.elem.nativeElement.clientHeight;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}