import {Component, OnInit} from "angular2/core";
import {MessageDisplayComponent} from './message-display.component';
import {AuthService} from "./auth.service";
import {Event$Service} from "./event$.service";
import {UserListComponent} from "./user-list.component";

@Component({
    selector: "chat-display",
    templateUrl: "app/templates/chat-display.html",
    styles: [`
    #chat-display {
        height: calc(100% - 10.8em);
        background-color: #fff;
        width: 80%;
        margin-left: 10%;
        z-index: 1;
        position: relative;
    }
    #filter-bar {
        height: 3em;
        width: 100%;
        background-color: gray;
        color: whitesmoke;
        display: block;  
    }
    .filter-item {
        border-left: 1px solid white;
        padding: 0 0.5em;
        height: 3em;
        width: 20%;
        float: left;
        clear: none;
    }
    `],
    directives: [MessageDisplayComponent, UserListComponent]
})
export class ChatDisplayComponent implements OnInit {
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