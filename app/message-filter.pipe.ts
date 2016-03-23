import {Pipe, PipeTransform} from "angular2/core";

type ChatType = { username: string, message: string, direction: string, type: string };

@Pipe({
    name: "messageFilter"
})
export class MessageFilterPipe implements PipeTransform {
    transform(messageArray: ChatType[], args: any[]) {
        let username = args[0];
        let select = args[1];
        let target = args[2];
        let direction = args[3];

        if (!target) {
            return messageArray;
        }
        else if (select == "Everyone") {
            if (direction) {
                return messageArray.filter(chat => chat.type == "chat").filter(chat => chat.direction == "From");
            }
            else {
                return messageArray.filter(chat => chat.type == "chat").filter(chat => (chat.direction == "To" || chat.direction == "Self"));
            }

        } else if (select == username) {
            if (direction) {
                return messageArray.filter(chat => chat.type == "whisper").filter(chat => (chat.direction == "To"));
            }
            else {
                return messageArray.filter(chat => chat.type == "whisper").filter(chat => (chat.direction == "From"));
            }
        }
        else {
            if (direction) {
                return messageArray.filter(chat => chat.type == "whisper").filter(chat => chat.username == select).filter(chat => chat.direction == "From");
            }
            else {
                return messageArray.filter(chat => chat.type == "whisper").filter(chat => chat.username == select).filter(chat => chat.direction == "To");
            }
            
        }
    };
};