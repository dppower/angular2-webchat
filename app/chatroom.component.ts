import {Component, OnInit, Injector} from 'angular2/core';
import {ChatFilterComponent} from "./chat-filter.component";
import {ChatInput} from './chat-input.component';
import {UserList} from "./user-list.component";
import {SocketService} from "./socket.service";
import {Event$Service} from "./event$.service";
import {Router, CanActivate} from "angular2/router";
import {AuthService} from "./auth.service";
import {getAppInjector} from "./app-injector-ref";

@Component({
    templateUrl: "app/templates/chatroom.component.html",
    directives: [ChatInput, UserList, ChatFilterComponent],
    providers: [SocketService]
})
@CanActivate((next, prev) => {
    let injector = getAppInjector();
    let authService: AuthService = injector.get(AuthService);
    let router: Router = injector.get(Router);
    
    return authService.isAuthenticated().toPromise().then((data) => {
        let authenticated = data.authenticated ? true : false;
        if (!authenticated) {
            router.navigate(["Login"]);
        }
        return authenticated;
    });
})
export class ChatRoomComponent implements OnInit {
    
    constructor(private socketService_: SocketService, private events_: Event$Service) {
        this.events_.create("refocus");
        this.events_.create("select-chat-target");
    };

    ngOnInit() {
        this.socketService_.connect(); 
    }

    refocusChatInput() {
        this.events_.emit("refocus");
    }
}