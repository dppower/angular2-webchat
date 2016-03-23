import {Component, OnInit, Injector} from "angular2/core";
import {Router, RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {ChatRoomComponent} from "./chatroom.component";
import {LoginComponent} from "./login.component";
import {AuthService} from "./auth.service";
import {Event$Service} from "./event$.service";
import {getAppInjector} from "./app-injector-ref";

@Component({
    selector: "my-app",
    templateUrl: "app/templates/app.component.html",
    directives: [ROUTER_DIRECTIVES],
    providers: [AuthService, Event$Service]
})
@RouteConfig([
    { path: "/login", name: "Login", component: LoginComponent},
    { path: "/chat", name: "Chat", component: ChatRoomComponent},
])
export class AppComponent implements OnInit{

    constructor(private authService_: AuthService, private router_: Router, private injector_: Injector) {
        getAppInjector(injector_);
    };

    ngOnInit() {
        this.authService_.isAuthenticated().subscribe(data => {
            if (data.authenticated == true) {
                this.router_.navigate(["Chat"]);
            }
            else {
                this.router_.navigate(["Login"]);
            }
        });
    };
}