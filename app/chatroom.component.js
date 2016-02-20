System.register(['angular2/core', './socket-service', './chat-display.component', './chat-input.component', "./chat-message", "./user-list.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, socket_service_1, chat_display_component_1, chat_input_component_1, chat_message_1, user_list_component_1;
    var ChatRoomComponent;
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
            },
            function (chat_message_1_1) {
                chat_message_1 = chat_message_1_1;
            },
            function (user_list_component_1_1) {
                user_list_component_1 = user_list_component_1_1;
            }],
        execute: function() {
            ChatRoomComponent = (function () {
                function ChatRoomComponent(socketService_) {
                    this.socketService_ = socketService_;
                    this.messages = [];
                    this.UserList = ["David", "Ann"];
                }
                ;
                ChatRoomComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.socketService_.chatStream.subscribe(function (data) {
                        var chat = data.clientId + ": " + data.message;
                        _this.messages.push(chat);
                    });
                };
                ChatRoomComponent.prototype.emitMessage = function (msg) {
                    var chat = new chat_message_1.ChatMessage(msg, this.socketService_.socketId);
                    this.socketService_.emitMessage(chat);
                };
                ChatRoomComponent = __decorate([
                    core_1.Component({
                        template: "\n        <div class=\"wrap\">\n            <div class=\"row\">\n                <div class=\"col-sm-9\">\n                    <h3>Chatroom</h3>\n                </div>\n                <div class=\"col-sm-3\">\n                    <h3>Users</h3>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"chat-box col-sm-9\">\n                    <chat-display *ngFor=\"#msg of messages\" [message]=\"msg\"></chat-display>\n                </div>\n                <div class=\"user-list col-sm-3\">\n                    <user-list [users]=\"UserList\"></user-list>\n                </div>\n            </div>\n        </div>\n        <div class=\"footer\">\n            <chat-input (addNewMessage)=\"emitMessage($event)\"></chat-input>\n        </div>\n    ",
                        directives: [chat_display_component_1.ChatDisplay, chat_input_component_1.ChatInput, user_list_component_1.UserList]
                    }), 
                    __metadata('design:paramtypes', [socket_service_1.SocketService])
                ], ChatRoomComponent);
                return ChatRoomComponent;
            })();
            exports_1("ChatRoomComponent", ChatRoomComponent);
        }
    }
});
//# sourceMappingURL=chatroom.component.js.map