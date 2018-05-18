'use strict';

//Modules
import https from 'https';
import express from 'express';
import cors from 'cors';
import bluebird from 'bluebird';
import mongoose from 'mongoose';
import fs from 'fs';
import bodyParser from 'body-parser';
import WebSocket from './websocket/websocket';
import config from './config/config.json';
import ActiveRoutes from './api/active-routes';

const env = process.env.NODE_ENV || 'dev';

class App {
    constructor() {
        this.setGlobals();
        this.getDB();
        this.initExpress();
        this.initRouter();
        this.listen();
        this.initWebsocket();
    }

    //Globals
    setGlobals() {
        global.config = config;
        global.db = global.config.db;
    }

    //DB
    getDB() {
        let { db } = global;
        mongoose.Promise = bluebird;

        mongoose
            .connect(db.uri, {
                promiseLibrary: bluebird,
                autoIndex:true,
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 500, // Reconnect every 500ms
                poolSize: 10 // Maintain up to 10 socket connections
            })
            .catch(err => {
                console.error(err);
            });

        return mongoose;
    }

    initExpress() {
        //Express
        let app = express();

        //express settings
        app.set('json spaces', 2);

        //Body Parser
        app.use(bodyParser.json());
        app.use(
            bodyParser.urlencoded({
                extended: true
            })
        );

        //CORS
        app.use(cors());

        this.app = app;
    }

    //Router
    initRouter(mongoose) {
        let api = express.Router();
        api.use((req, res, next) => {
            new ActiveRoutes(api);
            next();
        });
        this.app.use('/api', api);
    }


    //Listen
    listen() {
        let port = global.config.port;

        this.server = this.app.listen(port, () => {
            console.info('Started Web Server on port ', port);
        });
    }

    //Websocket
    initWebsocket() {
        WebSocket.init(this.server);
    }
}

new App();
