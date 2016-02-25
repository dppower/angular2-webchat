import {Component, Input} from "angular2/core";

@Component({
    selector: "user-list",
    template: `
        <div *ngFor="#user of users">
            <p>{{user.name}}</p>
        </div>
       `
})
export class UserList {

    @Input() users: { name: string, socket: string }[];

}