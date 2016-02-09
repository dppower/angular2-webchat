import {Component} from 'angular2/core';
import {SocketService} from './socket-service';
import {ChatDisplay} from './chat-display.component';

@Component({
    selector: 'my-app',
    template: `
        <h2>Webchat</h2>
        <chat-display></chat-display>
    `,
    directives: [ChatDisplay],
    providers: [SocketService]
})
export class AppComponent { }