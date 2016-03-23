"use strict";
import {Mongoose, Schema, Document, Connection} from "mongoose";
import * as bcrypt from "bcryptjs";

var dbConfig = {
    url: "mongodb://localhost:27017/users"
}

var usersConnection: Connection = new Mongoose().createConnection(dbConfig.url);

interface IUser {
    username: string;
    password: string;
}

export interface IUserDocument extends IUser, Document { }

var userSchema = new Schema({
    username: String,
    password: String
});

var userModel = usersConnection.model<IUserDocument>("User", userSchema);

export var User = {
    
    findUser: (username: string) => {
        return new Promise<IUserDocument>((resolve, reject) => {
            userModel.findOne({ username: username }, (err, res) => {
                if (err !== null) return reject(err);
                resolve(res);
            });
        });
    },

    findOneOrCreate: async (username: string, password: string, register: boolean): Promise<{ err: Error, user: IUserDocument }> => {
        try {
            let user: IUserDocument = await User.findUser(username);
            if (user && !register) {
                let isCorrect = await BcryptMethods.isCorrectPassword(password, user);
                if (isCorrect) {
                    return { err: undefined, user: user };
                }
                else {
                    return { err: undefined, user: undefined };
                }
            } else if (!user && register) {
                let newUser: IUser = { username, password };
                let newUserDocument = new UserDocument(newUser);
                let savedUser = await newUserDocument.save();
                return { err: undefined, user: savedUser };
            }
            else {
                return { err: undefined, user: undefined };
            }
        } catch (err) {
            console.log(err.message);
            return { err: new Error("Server is running slow. Please try again shortly."), user: undefined };
        }
        
    },

    findById: (id: string) => {
        return new Promise<IUserDocument>((resolve, reject) => {
            userModel.findById(id, (err, res) => {
                if (err !== null) return reject(err);
                resolve(res);
            });
        });   
    }

}

class BcryptMethods {
    static isCorrectPassword = async (password: string, user: IUserDocument) => {
        try {
            let isCorrect = await BcryptMethods.checkPasswords(password, user.password);
            return isCorrect;
        } catch (err) {
            throw err;
        }
    };

    private static checkPasswords = (password: string, hash: string) => {
        return new Promise<boolean>((resolve, reject) => {
            bcrypt.compare(password, hash, (err, success) => {
                if (err !== null) return reject(err);
                resolve(success);
            });
        });
    };

    private static generateSalt = () => {
        return new Promise<string>((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err !== null) return reject(err);
                resolve(salt);
            });
        });
    };

    private static generateHash = (password: string, salt: string) => {
        return new Promise<string>((resolve, reject) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err !== null) return reject(err);
                resolve(hash);
            });
        });
    };

    static encryptPassword = async (password: string) => {
        try {
            let salt = await BcryptMethods.generateSalt();
            let encryptedPassword = await BcryptMethods.generateHash(password, salt);
            return encryptedPassword;
        }
        catch (err) {
            throw err;
        }
    };
};

class UserDocument {

    private saveDocument = () => {
        return new Promise<IUserDocument>((resolve, reject) => {
            this.document_.save((err, user: IUserDocument) => {
                if (err !== null) return reject(err);
                resolve(user);
            });
        });   
    };

    save = async () => {
        try {
            this.document_.password = await BcryptMethods.encryptPassword(this.document_.password);
            let user = await this.saveDocument();
            return user;
        }
        catch (err) {
            throw err;
        }
    };

    constructor(document: IUser) {
        this.document_ = new userModel(document);
    }

    private document_: IUserDocument;
}