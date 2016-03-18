import {Component} from "angular2/core";
import {HttpService} from "./http.service";
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

    constructor(private httpService_: HttpService, private router_: Router) { };
    
    onSubmit() {
        if (!this.username || !this.password) return;
        this.httpService_.postCredentials(this.username, this.password, this.isLogin)
            .subscribe(data => {
                this.responseMessage = data.message;
                if (data.authenticated == true)
                {
                    this.httpService_.username = data.user;
                    this.router_.navigate(["Chat"]);
                }
            });
    };

    toggleLogin() {
        this.isLogin = !this.isLogin;
    };
};