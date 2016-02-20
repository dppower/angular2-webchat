import {Component, OnInit} from "angular2/core";
import {SocketService} from "./socket-service"

@Component({
    template: `
        <div>
            <p>Register Component</p>
        </div>
    `

})
export class RegisterComponent implements OnInit {
    // To display a list of names previously used
    allUserNames: string[];

    inputName: string;

    constructor(private socketService_: SocketService) { }

    // Need to check for previously used usernames
    ngOnInit() {
    }
};