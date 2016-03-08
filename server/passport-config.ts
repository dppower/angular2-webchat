import {User, userModel, IUserModel} from "./db-config";
import {Strategy} from "passport-local";

export var passportConfig = function (passport) {

    passport.serializeUser((user: IUserModel, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        userModel.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use("local-signup", new Strategy((username, password, done) => {
        userModel.findOne({ username: username }, (err, user) => {
            if (err)
            {
                return done(err, null, { message: "The db search failed." });
            }
            if (user)
            {
                return done(null, null, { message: "This username is already in use." });
            } else
            {
                var newUser = new User({ username: username, password: password });
                newUser.saveDocument((err, user) => {
                    if (err) return done(err, null, { message: "The new user could not be saved to db." });
                    return done(null, user, { message: "A new user was successfully added to the db." });
                });
            }
        });
    }));

    passport.use("local-login", new Strategy((username, password, done) => {
        userModel.findOne({ username: username }, (err, user) => {
            if (err)
            {
                return done(err, null, { message: "The db search failed." });
            }
            if (!user || !User.checkPassword(password, user))
            {
                return done(null, null, { message: "Invalid username or password!" });
            }
            return done(null, user, { message: user.username + " successfully logged in" });
        });
    }));
}
