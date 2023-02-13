const cookieParser = require("cookie-parser");
const express = require("express");
const hbsExp = require("express-handlebars");
const session = require("../middlewares/session");
const trim = require("../middlewares/trim");
module.exports = (app) => {
    const hbs = hbsExp.create({
        extname: ".hbs",
    });

    app.engine(".hbs", hbs.engine);
    app.set("view engine", ".hbs");
    app.use("/static", express.static("static"));
    app.use(express.urlencoded({
      extended: true
    }))
    app.use(cookieParser())
    app.use(session())
    app.use(trim())
};
