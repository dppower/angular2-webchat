import {Directive, ElementRef, OnInit, Input, HostListener} from "angular2/core";

@Directive({
    selector: "[repeatFocus]",
})
export class RepeatFocus {

    @Input() focusOnce: string = "false";

    wasFocusedOnce: boolean = false;

    @Input() shouldFocus: string = "true";
    
    @HostListener("blur", ["$event.target"]) refocus = (element) => {
        if (this.focusOnce === "true" && this.wasFocusedOnce !== true) {
            setTimeout(() => element.focus(), 0);
            this.wasFocusedOnce = true;
        }
        else if (this.shouldFocus === "true" && this.focusOnce !== "true") {
            setTimeout(() => element.focus(), 0);
        }
        return false;
    };

    constructor(private elem: ElementRef) { }
    
    ngAfterViewInit() {
        let initialBlur = new FocusEvent("blur", { bubbles: false });
        setTimeout(() => this.elem.nativeElement.dispatchEvent(initialBlur), 0);
    }
}