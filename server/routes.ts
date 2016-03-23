import * as express from "express";
import {Passport} from "passport";
import path = require("path");
import bodyParser = require("body-parser");

export var routeConfig = function (app, passport: Passport) {

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/html/index.html"));
    });
    
    app.post("/register", function (req, res, next) {
        passport.authenticate("local-signup", function (err, user, info) {
            if (err)
            {
                return res.json({ "message": err.message });
            }
            if (!user)
            {
                return res.json({"message": info.message });
            }
            req.login(user, err => {
                if (err) { return next(err); }
                return res.json({ "username": user.username, "authenticated": req.isAuthenticated() });
            });
        })(req, res, next);
    });

    app.post("/login", function (req, res, next) {
        passport.authenticate("local-login", function (err, user, info) {
            if (err)
            {
                return res.json({ "message": err.message });
            }
            if (!user)
            {
                return res.json({ "message": info.message });
            }
            req.login(user, err => {
                if (err) { return next(err); }
                return res.json({ "username": user.username, "authenticated": req.isAuthenticated()});
            });
        })(req, res, next);
    });
    
    app.post("/logout", (req, res) => {
        res.cookie("connect.sid", "", { expires: new Date() });   
        res.json({ "message": req.user.username + " successfully logged out." });
        req.logout();
        req.session.destroy();
    });

    app.post("/authenticated", (req, res) => {
        if (req.isAuthenticated())
        {
            return res.json({ "authenticated": true, "username": req.user.username });
        }
        return res.json({ "authenticated": false });
    });
}