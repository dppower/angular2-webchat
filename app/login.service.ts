import {Injectable} from "angular2/core";
import {Http, Response, Headers, RequestOptions} from "angular2/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class LoginService {
    constructor(private http_: Http) { };

    get isAuthenticated(): boolean { return this.isAuthenticated_; };
    private registerUrl = "/register";
    private loginUrl = "/login";
    private logoutUrl = "/logout";

    postCredentials(username: string, password: string, isLogin: boolean) {
        let postBody = JSON.stringify({ username, password });
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });
        let url = isLogin ? this.loginUrl : this.registerUrl;

        return this.http_.post(url, postBody, options)
            .map(res => res.json())
            .do(data => console.log(data))
            .catch(this.handleErrors);
    };

    Logout() {
        let postBody = JSON.stringify({});
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });
        return this.http_.post(this.logoutUrl, postBody, options)
            .map(res => res.json())
            .do(data => console.log(data))
            .catch(this.handleErrors);
    };
   

    private handleErrors(error: Response) {
        return Observable.throw(error.json() || "server error");
    }

    private isAuthenticated_: boolean;
}