import {Component, OnInit, Injector} from 'angular2/core';
import {ChatDisplayComponent} from "./chat-display.component";
import {ChatInput} from './chat-input.component';
import {SocketService} from "./socket.service";
import {Event$Service} from "./event$.service";
import {Router, CanActivate} from "angular2/router";
import {AuthService} from "./auth.service";
import {getAppInjector} from "./app-injector-ref";

@Component({
    template: `
    <chat-display></chat-display>
    <chat-input></chat-input>
    `,
    directives: [ChatInput, ChatDisplayComponent],
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
        this.events_.create("select-chat-target");
    };

    ngOnInit() {
        this.socketService_.connect(); 
    }
}