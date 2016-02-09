System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var ChatInput;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ChatInput = (function () {
                function ChatInput() {
                    this.message = "";
                    this.addNewMessage = new core_1.EventEmitter();
                }
                ChatInput.prototype.sendMessage = function () {
                    this.addNewMessage.emit(this.message);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ChatInput.prototype, "addNewMessage", void 0);
                ChatInput = __decorate([
                    core_1.Component({
                        selector: 'chat-input',
                        template: "\n        <div>\n            <input type=\"text\" id=\"message-box\" [(ngModel)]=\"message\">\n            <button id=\"send-message-btn\" (click)=\"sendMessage()\">Send</button>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ChatInput);
                return ChatInput;
            })();
            exports_1("ChatInput", ChatInput);
        }
    }
});
//# sourceMappingURL=chat-input.component.js.map