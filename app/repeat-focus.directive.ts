import {Directive, ElementRef} from "angular2/core";

@Directive({
    selector: "[repeatFocus]",
    host: { "(refocusEvent)": "focus()" }
})
export class RepeatFocus {

    constructor(private elem: ElementRef) { }
    
    focus() {
        this.elem.nativeElement.focus();
    } 
}