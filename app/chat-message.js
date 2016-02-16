System.register([], function(exports_1) {
    var ChatMessage;
    return {
        setters:[],
        execute: function() {
            ChatMessage = (function () {
                function ChatMessage(message, clientId) {
                    this.message = message;
                    this.clientId = clientId;
                }
                ;
                return ChatMessage;
            })();
            exports_1("ChatMessage", ChatMessage);
        }
    }
});
//# sourceMappingURL=chat-message.js.map