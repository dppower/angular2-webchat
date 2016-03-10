import {Component} from "angular2/core";
import {LoginService} from "./login.service";

@Component({
    templateUrl: "app/templates/login.component.html",
    providers: [LoginService]
    
})
export class LoginComponent {
    
    registerText: {} = { title: "Register", text: "Already have an account?" };
    loginText: {} = { title: "Login", text: "Need an account?" };
    
    responseMessage: string = null;

    username: string;
    password: string;

    isLogin: boolean = true;

    constructor(private loginService_: LoginService) { };
    
    onSubmit() {
        if (!this.username || !this.password) return;
        this.loginService_.postCredentials(this.username, this.password, this.isLogin)
            .subscribe(data => { this.responseMessage = data.message; });

    };

    toggleLogin() {
        this.isLogin = !this.isLogin;
    };
};