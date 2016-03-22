"use strict";
import {Mongoose, Schema, Document, Connection} from "mongoose";
import * as bcrypt from "bcryptjs";

var dbConfig = {
    url: "mongodb://localhost:27017/users"
}

var ssConfig = {
    url: "mongodb://localhost:27017/sessions"
}

var usersConnection: Connection = new Mongoose().createConnection(dbConfig.url);

export var sessionConnection: Connection = new Mongoose().createConnection(ssConfig.url);

interface IUser {
    username: string;
    password: string;
}

export interface IUserModel extends IUser, Document {
    salt: string;
}

var userSchema = new Schema({
    username: String,
    password: String,
    salt: String
});

export var userModel = usersConnection.model<IUserModel>("User", userSchema);

export class User {

    generateSalt = () => {
        return new Promise<string>((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err !== null) return reject(err);
                resolve(salt);
            });
        });
    };

    generateHash = (password: string, salt: string) => {
        return new Promise<string>((resolve, reject) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err !== null) return reject(err);
                resolve(hash);
            });
        });
    };

    static checkPasswords = (password: string, hash: string) => {
        return new Promise<boolean>((resolve, reject) => {
            bcrypt.compare(password, hash, (err, success) => {
                if (err !== null) return reject(err);
                resolve(success);
            });
        });
    };

    encryptPassword = async () => {
        try {
            this.model_.salt = await this.generateSalt();
            this.model_.password = await this.generateHash(this.model_.password, this.model_.salt);
        }
        catch (err) {
            console.log(err.message);
        }   
    };

    saveDocument = () => {
        return new Promise<IUserModel>((resolve, reject) => {
            this.model_.save((err, user: IUserModel) => {
                if (err !== null) return reject(err);
                resolve(user);
            });
        });   
    };

    saveNewUser = async () => {
        try {
            await this.encryptPassword();
            let user = await this.saveDocument();
            return user;
        }
        catch (err) {
            console.log(err.message);
        }
    };

    static isCorrectPassword = async (password: string, user: IUserModel) => {
        try {
            let isCorrect = await User.checkPasswords(password, user.password);
            return isCorrect;
        } catch (err) {
            console.log(err.message);
        }
    };

    constructor(document: IUser) {
        this.model_ = new userModel();
        this.model_.username = document.username;
        this.model_.password = document.password;
    }

    private model_: IUserModel;
}