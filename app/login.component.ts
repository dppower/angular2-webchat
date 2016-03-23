import {Component} from "angular2/core";
import {AuthService} from "./auth.service";
import {Router} from "angular2/router";

@Component({
    templateUrl: "app/templates/login.component.html"   
})
export class LoginComponent {
    
    registerText: {} = { title: "Register", text: "Already have an account?" };
    loginText: {} = { title: "Login", text: "Need an account?" };
    
    responseMessage: string = "";

    username: string;
    password: string;

    isLogin: boolean = true;

    constructor(private authService_: AuthService, private router_: Router) { };
    
    onSubmit() {
        if (!this.username || !this.password) return;
        this.authService_.postCredentials(this.username, this.password, this.isLogin)
            .subscribe(data => {
                if (data.authenticated == true) {
                    this.router_.navigate(["Chat"]);
                }
                else {
                    this.responseMessage = data.message;
                }
            });
    };

    toggleLogin() {
        this.responseMessage = "";
        this.isLogin = !this.isLogin;
    };
};