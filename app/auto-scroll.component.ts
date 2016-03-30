import {Component} from "angular2/core";
import {AutoScrollDirective} from "./auto-scroll.directive";

@Component({
    selector: "auto-scroll-display",
    template: `
    <div #this class="message-box" [inScrollHeight]="this.scrollHeight" [inClientHeight]="this.clientHeight" autoScroll>
        <ng-content></ng-content>
    </div>
    `,
    styles: [`
    .message-box {
        height: calc(100% - 3em);
        width: 80%;
        overflow-y: scroll;
        float: left;
    }
    `],
    directives: [AutoScrollDirective]
})
export class AutoScrollComponent{ }