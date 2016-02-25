import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {SocketService} from "./socket-service";
import {ChatRoomComponent} from "./chatroom.component";
import {RegisterComponent} from "./register.component";

@Component({
    selector: 'my-app',
    template: `
            <div class="main-page container">
                <div class="title-box">
                    <h2>Webchat</h2>
                </div>
                <router-outlet></router-outlet>
            </div>
            `,
    directives: [ROUTER_DIRECTIVES],
    providers: [SocketService]
})
    @RouteConfig([
        { path: '/', name: 'Register', component: RegisterComponent, useAsDefault: true },
        { path: '/register', name: 'Register', component: RegisterComponent},
        { path: '/chat', name: 'Chat', component: ChatRoomComponent},
])
export class AppComponent { }