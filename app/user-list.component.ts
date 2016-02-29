import {Component, Input} from "angular2/core";

@Component({
    selector: "user-list",
    template: `
         <p>{{user.name}}</p>
       `
})
export class UserList {

    @Input() user: { name: string, socket: string };

}