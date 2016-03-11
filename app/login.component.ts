import {Component} from "angular2/core";
import {LoginService} from "./login.service";
import {Router} from "angular2/router";

@Component({
    templateUrl: "app/templates/login.component.html"   
})
export class LoginComponent {
    
    registerText: {} = { title: "Register", text: "Already have an account?" };
    loginText: {} = { title: "Login", text: "Need an account?" };
    
    responseMessage: string = null;

    username: string;
    password: string;

    isLogin: boolean = true;

    constructor(private loginService_: LoginService, private router_: Router) { };
    
    onSubmit() {
        if (!this.username || !this.password) return;
        this.loginService_.postCredentials(this.username, this.password, this.isLogin)
            .subscribe(data => {
                this.responseMessage = data.message;
                if (data.authenticated == true)
                {
                    this.router_.navigate(["Chat"]);
                }
            });
    };

    toggleLogin() {
        this.isLogin = !this.isLogin;
    };
};