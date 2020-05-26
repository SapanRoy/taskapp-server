"use strict";

const http = require('http');
const express = require("express");
const { listRouter } = require('./routers/list-router');
const { cardRouter } = require('./routers/card-router');

const bodyParser = require("body-parser");
let httpServer = null;
const fs = require('fs');

function initialize() {
    return new Promise((resolve, reject) => {

        const app = express();
        httpServer = http.createServer(app);

        let appConfig = JSON.parse(fs.readFileSync('./app-config/app-config.json'));


        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', appConfig.allowed_url);
            res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
            next();
        });
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json())

        app.use(appConfig.base_url, listRouter);
        app.use(appConfig.base_url, cardRouter);

        httpServer.listen(appConfig.api_port, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });

    });
}
module.exports.initialize = initialize;

async function startApp() {
    console.log('Starting application');
    try {
        console.log('Initializing web server module');
        await initialize();
    } catch (err) {
        console.error(err);

        process.exit(1); // Non-zero failure code
    }
}
startApp();

