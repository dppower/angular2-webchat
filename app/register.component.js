System.register(["angular2/core", "./socket-service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, socket_service_1;
    var RegisterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (socket_service_1_1) {
                socket_service_1 = socket_service_1_1;
            }],
        execute: function() {
            RegisterComponent = (function () {
                function RegisterComponent(socketService_) {
                    this.socketService_ = socketService_;
                }
                // Need to check for previously used usernames
                RegisterComponent.prototype.ngOnInit = function () {
                };
                RegisterComponent = __decorate([
                    core_1.Component({
                        template: "\n        <div>\n            <p>Register Component</p>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [socket_service_1.SocketService])
                ], RegisterComponent);
                return RegisterComponent;
            })();
            exports_1("RegisterComponent", RegisterComponent);
            ;
        }
    }
});
//# sourceMappingURL=register.component.js.map