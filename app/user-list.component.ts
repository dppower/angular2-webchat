import {Component, Input} from "angular2/core";

@Component({
    selector: "user-list",
    template: `
         <p>{{username}}</p>
       `
})
export class UserList {

    @Input() username: string;

}