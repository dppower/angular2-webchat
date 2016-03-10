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
                return res.json({ "error": err, "message": info.message });
            }
            if (!user)
            {
                return res.json({"message": info.message });
            }
            req.login(user, err => {
                if (err) { return next(err); }
                console.log(req.session.passport.user);
                console.log(req.user);
                return res.json({ "id": user._id, "user": user.username, "message": info.message });
            });
        })(req, res, next);
    });

    app.post("/login", function (req, res, next) {
        passport.authenticate("local-login", function (err, user, info) {
            if (err)
            {
                return res.json({ "error": err, "message": info.message });
            }
            if (!user)
            {
                return res.json({ "message": info.message });
            }
            req.login(user, err => {
                if (err) { return next(err); }
                return res.json({ "id": user._id, "user": user.username, "message": info.message });
            });
        })(req, res, next);
    });

    // Logout, req.logout is from passport, closes the sesssion
    app.get("/logout", (req, res) => {
            req.logout();
            res.redirect("/");
        });
    //app.get("/chat", isLoggedIn, (req, res) => {
    //});
    // Check to see if the user is authenticated
    //var isLoggedIn = (req, res, next) => {
    //    if (req.isAutheticated()) { return next(); };
    //    res.redirect("/");
    //}
}