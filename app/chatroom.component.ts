import {Component, OnInit, Injector} from 'angular2/core';
import {ChatDisplay} from './chat-display.component';
import {ChatInput} from './chat-input.component';
import {UserList} from "./user-list.component";
import {SocketService} from "./socket.service";
import {Event$Service} from "./event$.service";
import {Router, CanActivate} from "angular2/router";
import {AuthService} from "./auth.service";
import {getAppInjector} from "./app-injector-ref";

@Component({
    templateUrl: "app/templates/chatroom.component.html",
    directives: [ChatDisplay, ChatInput, UserList],
    providers: [SocketService]
})
@CanActivate((next, prev) => {
    let injector = getAppInjector();
    let httpService: AuthService = injector.get(AuthService);
    let router: Router = injector.get(Router);
    
    return httpService.isAuthenticated().toPromise().then((data) => {
        let authenticated = data.authenticated ? true : false;
        if (!authenticated) {
            router.navigate(["Login"]);
        }
        return authenticated;
    });
})
export class ChatRoomComponent implements OnInit {
    
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

    constructor(private socketService_: SocketService, private events_: Event$Service) {
        this.events_.create("refocus");
        this.events_.create("select-chat-target");

        this.events_.subscribe("select-chat-target", (value) => this.selectedTarget = value);
    };

    ngOnInit() {
        this.socketService_.connect(); 
    }

    refocusChatInput() {
        this.events_.emit("refocus");
    }
}