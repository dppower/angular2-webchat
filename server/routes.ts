import * as express from "express";
import path = require("path");

export var Router = express.Router();

Router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/../public/html/index.html"));
});