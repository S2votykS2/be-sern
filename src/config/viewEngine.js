import express from "express";
// import path from 'path';

let configViewEngine = (app) => {
    app.use(express.static("./src/public")); //ES6: ko can path.join(__dirname,''):dg link tuong doi, dung luon link tuyet doi
    app.set("view engine", "ejs");
    app.set("views", "./src/views")
}

module.exports = configViewEngine;