import {Component, OnInit} from "angular2/core";
import {SocketService} from "./socket-service";
import {Router} from "angular2/router";

@Component({
    template: `
        <div class="col-sm-6 col-sm-offset-3">
            <h1><span class="fa fa-sign-in"></span> {{isLogin ? loginText.title : signupText.title }}</h1>
            <form>
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" class="form-control" placeholder="username">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" placeholder="password">
                </div>

                <button type="submit" class="btn btn-warning btn-lg">{{isLogin ? loginText.title : signupText.title }}</button>
            </form>
            <p></p>
            <p>{{isLogin ? loginText.text : signupText.text }} <span class="fake-link" (click)="toggleLogin()">{{isLogin ? signupText.title : loginText.title }}</span></p>
        </div>
    `
})
export class RegisterComponent implements OnInit {
    // To display a list of names previously used
    allUserNames: string[];

    signupText: {} = { title: "Signup", text: "Already have an account?" };
    loginText: {} = { title: "Login", text: "Need an account?" };
     
    inputName: string;

    isLogin: boolean = true;

    constructor(private socketService_: SocketService, private router_: Router) { }

    // Need to check for previously used usernames
    ngOnInit() {
    }

    goToChat() {
        this.socketService_.emitName(this.inputName);
        this.router_.navigate(["Chat"]);
    }

    toggleLogin() {
        this.isLogin = !this.isLogin;
    }
};