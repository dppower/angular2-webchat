import {Component} from "angular2/core";
import {AuthService} from "./auth.service";
import {AnimatedMessage} from "./response-message.component";
import {Router} from "angular2/router";
import {RepeatFocus} from "./repeat-focus.directive";

@Component({
    templateUrl: "app/templates/login.component.html",
    directives: [AnimatedMessage, RepeatFocus]     
})
export class LoginComponent {
    
    registerText = { title: "Register", text: "Already have an account?" };
    loginText = { title: "Login", text: "Need an account?" };
    
    isFormActive: boolean = true;

    responseMessage: string = "";

    username: string;
    password: string;

    isLogin: boolean = true;

    constructor(private authService_: AuthService, private router_: Router) { };
    
    onSubmit() {
        this.responseMessage = "";
        if (!this.username || !this.password) {
            this.responseMessage = "Please enter a username and password.";
        }
        else {
            this.authService_.postCredentials(this.username, this.password, this.isLogin)
                .subscribe(data => {
                    if (data.authenticated == true) {
                        this.router_.navigate(["Chat"]);
                    }
                    else {
                        this.responseMessage = data.message;
                    }
                });
        }
        this.isFormActive = false;
        setTimeout(() => this.isFormActive = true, 0);
    };

    toggleLogin() {
        this.responseMessage = "";
        this.isLogin = !this.isLogin;
    };
};