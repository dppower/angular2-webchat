import {Directive, Input, HostBinding, OnChanges, SimpleChange} from "angular2/core";

@Directive({
    selector: "[autoScroll]"
})
export class AutoscrollDirective {
    @Input() inScrollHeight;
    @Input() inClientHeight;

    @HostBinding("scrollTop") outScrollTop;
    
    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if (changes["inScrollHeight"] || changes["inClientHeight"]) {
            this.scroll();
        }
    };

    scroll() {
        this.outScrollTop = this.inScrollHeight - this.inClientHeight;
    };
}