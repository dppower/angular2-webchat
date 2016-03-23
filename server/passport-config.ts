"use strict";
import {User, IUserDocument} from "./db-config";
import {Strategy} from "passport-local";

export var passportConfig = function (passport) {

    passport.serializeUser((user: IUserDocument, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(
            value => done(null, value),
            err => done(err, null)
        );
    });

    passport.use("local-signup", new Strategy(async (username, password, done) => {
        let results = await User.findOneOrCreate(username, password, true);

        if (results.err) {
            return done(results.err);
        }
        else {
            if (results.user === undefined) {
                return done(null, null, { message: "This username is already in use." });
            }
            else {
                return done(null, results.user);
            }
        }
        
    }));

    passport.use("local-login", new Strategy(async (username, password, done) => {
        let results = await User.findOneOrCreate(username, password, false);

        if (results.err) {
            return done(results.err);
        }
        else {
            if (results.user === undefined) {
                return done(null, null, { message: "Invalid username or password!" });
            }
            else {
                return done(null, results.user);
            }
        }
    }));
}
