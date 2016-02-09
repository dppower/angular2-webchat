System.register(['angular2/core', './chat-input.component', './socket-service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, chat_input_component_1, socket_service_1;
    var ChatDisplay;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (chat_input_component_1_1) {
                chat_input_component_1 = chat_input_component_1_1;
            },
            function (socket_service_1_1) {
                socket_service_1 = socket_service_1_1;
            }],
        execute: function() {
            ChatDisplay = (function () {
                function ChatDisplay(socket_) {
                    this.socket_ = socket_;
                    this.messages = [];
                    this.socket_.socket.on('chat', function (msg) {
                        this.messages.push(msg);
                    });
                }
                ;
                ChatDisplay.prototype.addMessageToArray = function (msg) {
                    this.messages.push(msg);
                    this.socket_.socket.emit('chat', msg);
                };
                ChatDisplay = __decorate([
                    core_1.Component({
                        selector: 'chat-display',
                        template: "\n        <p *ngFor='#msg of messages'>{{msg}}</p>\n        <chat-input (addNewMessage)=\"addMessageToArray($event)\"></chat-input>\n    ",
                        directives: [chat_input_component_1.ChatInput]
                    }), 
                    __metadata('design:paramtypes', [socket_service_1.SocketService])
                ], ChatDisplay);
                return ChatDisplay;
            })();
            exports_1("ChatDisplay", ChatDisplay);
        }
    }
});
//# sourceMappingURL=chat-display.component.js.map