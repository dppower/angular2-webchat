import {Component, OnInit} from "angular2/core";
import {ChatDisplay} from './chat-display.component';
import {AuthService} from "./auth.service";
import {Event$Service} from "./event$.service";

@Component({
    selector: "chat-filter",
    templateUrl: "app/templates/chat-filter.component.html",
    directives: [ChatDisplay]
})
export class ChatFilterComponent implements OnInit {
    username: string;

    selectedTarget: string = "Everyone";

    targetFilter: boolean = false;

    directionFilter: boolean = false;

    toggleTargetFilter() {
        this.targetFilter = !this.targetFilter;
    };

    toggleDirectionFilter() {
        this.directionFilter = !this.directionFilter;
    };

    resetFilters() {
        this.targetFilter = false;
        this.directionFilter = false;
    };

    constructor(private events_: Event$Service, private authService_: AuthService) {
        this.events_.subscribe("select-chat-target", (value) => this.selectedTarget = value);
    }

    ngOnInit() {
        this.username = this.authService_.username;
    }
}