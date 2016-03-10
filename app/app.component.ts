import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {HTTP_PROVIDERS} from "angular2/http";
import {ChatRoomComponent} from "./chatroom.component";
import {LoginComponent} from "./login.component";

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
    providers: [HTTP_PROVIDERS]
})
@RouteConfig([
    { path: '/login', name: 'Login', component: LoginComponent, useAsDefault: true},
    { path: '/chat', name: 'Chat', component: ChatRoomComponent},
])
export class AppComponent {
    //if not logged go to register
    //if logged in go to chat
}