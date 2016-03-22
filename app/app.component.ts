import {Component, OnInit, Injector} from "angular2/core";
import {Router, RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {ChatRoomComponent} from "./chatroom.component";
import {LoginComponent} from "./login.component";
import {HttpService} from "./http.service";
import {Event$Service} from "./event$.service";
import {getAppInjector} from "./app-injector-ref";

@Component({
    selector: "my-app",
    template: `
            <div class="main-page container-fluid">
                <div class="title-box">
                    <h2>Webchat</h2>
                </div>
                <router-outlet></router-outlet>
            </div>
            `,
    directives: [ROUTER_DIRECTIVES],
    providers: [HttpService, Event$Service]
})
@RouteConfig([
    { path: "/login", name: "Login", component: LoginComponent},
    { path: "/chat", name: "Chat", component: ChatRoomComponent},
])
export class AppComponent implements OnInit{

    constructor(private httpService_: HttpService, private router_: Router, private injector_: Injector) {
        getAppInjector(injector_);
    };

    ngOnInit() {
        this.httpService_.isAuthenticated().subscribe(data => {
            if (data.authenticated == true) {
                this.router_.navigate(["Chat"]);
            }
            else {
                this.router_.navigate(["Login"]);
            }
        });
    };
}