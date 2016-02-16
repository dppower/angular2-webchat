System.register(['angular2/core', './socket-service', './chat-display.component', './chat-input.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, socket_service_1, chat_display_component_1, chat_input_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (socket_service_1_1) {
                socket_service_1 = socket_service_1_1;
            },
            function (chat_display_component_1_1) {
                chat_display_component_1 = chat_display_component_1_1;
            },
            function (chat_input_component_1_1) {
                chat_input_component_1 = chat_input_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(socketService_) {
                    this.socketService_ = socketService_;
                    this.messages = [];
                }
                ;
                AppComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.socketService_.chatStream.subscribe(function (data) {
                        var chat = data.clientId + ": " + data.message;
                        _this.messages.push(chat);
                    });
                };
                AppComponent.prototype.emitMessage = function (msg) {
                    var chat = { message: msg, clientId: this.socketService_.socketId };
                    this.socketService_.emitMessage(chat);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: "my-app",
                        template: "\n        <div class=\"wrap\">\n            <div class=\"container-fluid\">\n                <h2>Webchat</h2>\n                <chat-display *ngFor=\"#msg of messages\" [message]=\"msg\"></chat-display>\n                <div class=\"push\"></div>\n            </div>\n        </div>\n        <footer class=\"footer\">\n            <div class=\"container-fluid\">\n                <chat-input (addNewMessage)=\"emitMessage($event)\"></chat-input>\n            </div>\n        </footer>\n    ",
                        directives: [chat_display_component_1.ChatDisplay, chat_input_component_1.ChatInput],
                        providers: [socket_service_1.SocketService]
                    }), 
                    __metadata('design:paramtypes', [socket_service_1.SocketService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map