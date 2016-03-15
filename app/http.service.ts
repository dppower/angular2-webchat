import {Injectable} from "angular2/core";
import {Http, Response, Headers, RequestOptions} from "angular2/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class HttpService {
    constructor(private http_: Http) { };
    
    private registerUrl = "/register";
    private loginUrl = "/login";
    private logoutUrl = "/logout";
    private authenticatedUrl = "/authenticated";

    postCredentials(username: string, password: string, isLogin: boolean) {
        let url = isLogin ? this.loginUrl : this.registerUrl;

        return this.httpPost({username, password}, url);
    };

    logout() {
        return this.httpPost({}, this.logoutUrl);
    };
   
    isAuthenticated() {
        return this.httpPost({}, this.authenticatedUrl);
    }

    private httpPost(body: Object, url: string) {
        let postBody = JSON.stringify(body);
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });
        return this.http_.post(url, postBody, options)
            .map(res => res.json())
            .do(data => console.log(data))
            .catch(this.handleErrors);
    }

    private handleErrors(error: Response) {
        return Observable.throw(error.json() || "server error");
    }
}