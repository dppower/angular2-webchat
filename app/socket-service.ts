import {Injectable} from 'angular2/core';

@Injectable()
export class SocketService {
    socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io.connect();
    }
}