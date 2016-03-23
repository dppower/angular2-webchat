import {Mongoose, Connection} from "mongoose";

var ssConfig = {
    url: "mongodb://localhost:27017/sessions"
}

export var sessionConnection: Connection = new Mongoose().createConnection(ssConfig.url);