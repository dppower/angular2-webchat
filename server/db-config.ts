"use strict";
import {Mongoose, Schema, Document} from "mongoose";
import * as bcrypt from "bcryptjs";

export var dbConfig = {
    url: "mongodb://localhost:27017/users"
}

export var mongoose: Mongoose = new Mongoose();

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

export var userModel = mongoose.model<IUserModel>("User", userSchema);

export class User {

    generateSalt = () => {
        return new Promise<string>((resolve, reject) => {
            resolve(bcrypt.genSaltSync(10));
        });
    };

    generateHash = (password: string, salt: string) => {
        return new Promise<string>((resolve, reject) => {
            resolve(bcrypt.hashSync(password, salt));
        });
    };

    encryptPassword = async () => {
        this.model_.salt = await this.generateSalt().catch((err: Error) => console.log("salt error: " + err.message));
        this.model_.password = await this.generateHash(this.model_.password, this.model_.salt).catch((err: Error) => console.log("hash error: " + err.message)); 
    };

    saveDocument = async (onSaveDocument: (err: Error, user: IUserModel) => any) => {
        await this.encryptPassword().then(() => { this.model_.save(onSaveDocument); });
    };

    static checkPassword = (password: string, user: IUserModel): boolean => {
        return bcrypt.compareSync(password, user.password);
    };

    constructor(document: IUser) {
        this.model_ = new userModel();
        this.model_.username = document.username;
        this.model_.password = document.password;
    }

    private model_: IUserModel;
}