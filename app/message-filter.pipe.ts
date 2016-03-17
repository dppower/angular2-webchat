import {Pipe, PipeTransform} from "angular2/core";

type ChatType = { username: string, message: string, direction: string, type: string };

@Pipe({
    name: "messageFilter"
})
export class MessageFilterPipe implements PipeTransform {
    transform(messageArray: ChatType[], args: any[]) {
        let select = args[0];
        let target = args[1];
        let direction = args[2];

        if (!target) {
            return messageArray;
        }
        else if (select == "Everyone") {
            if (direction) {
                return messageArray.filter(chat => chat.type != "whisper").filter(chat => chat.direction == "From");
            }
            else {
                return messageArray.filter(chat => chat.type != "whisper").filter(chat => chat.direction == "To");
            }

        }
        else {
            if (direction) {
                return messageArray.filter(chat => chat.username == select).filter(chat => chat.direction == "From");
            }
            else {
                return messageArray.filter(chat => chat.username == select).filter(chat => chat.direction == "To");
            }
            
        }
    };
};