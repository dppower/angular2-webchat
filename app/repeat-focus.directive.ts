import {Directive, ElementRef, OnDestroy, OnInit} from "angular2/core";
import {Event$Service} from "./event$.service";

@Directive({
    selector: "[repeatFocus]",
})
export class RepeatFocus implements OnDestroy, OnInit {

    subscription: any;

    constructor(private elem: ElementRef, private events_: Event$Service) {
        this.subscription = this.events_.subscribe("refocus", (data) => this.focus(data));
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