import {Component, Input} from "angular2/core";

@Component({
    selector: "user-list",
    template: `
        <ul *ngFor="#user of users">
            <li>{{user}}</li>
        </ul>
       `
})
export class UserList {

    @Input() users: string[];

}