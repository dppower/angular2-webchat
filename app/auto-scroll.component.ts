import {Component} from "angular2/core";
import {AutoscrollDirective} from "./auto-scroll.directive";

@Component({
    selector: "auto-scroll-display",
    template: `
    <div #this class="chat-box" [inScrollHeight]="this.scrollHeight" [inClientHeight]="this.clientHeight" autoScroll>
        <ng-content></ng-content>
    </div>
    `,
    directives: [AutoscrollDirective]
})
export class AutoScrollComponent{ }