System.register(["angular2/core", "rxjs/Rx"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Rx_1;
    var SocketService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            SocketService = (function () {
                function SocketService() {
                    this.socket_ = io.connect();
                    this.chatStream = Rx_1.Observable.fromEvent(this.socket_, "chat");
                }
                Object.defineProperty(SocketService.prototype, "socketId", {
                    get: function () { return this.socket_.id; },
                    enumerable: true,
                    configurable: true
                });
                ;
                SocketService.prototype.emitMessage = function (chat) { this.socket_.emit("chat", chat); };
                SocketService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], SocketService);
                return SocketService;
            })();
            exports_1("SocketService", SocketService);
        }
    }
});
//# sourceMappingURL=socket-service.js.map