import express from 'express'
import bodyParser from 'body-parser'
import * as jsonwebtoken from "jsonwebtoken";
import config from "../../config";

export default (apiRoot, routes) => {
    const app = express();

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        if (req.headers && req.headers['authorization'] && req.headers['authorization'].split(' ')[0] === 'JWT') {
            jsonwebtoken.verify(req.headers['authorization'].split(' ')[1], config.secret,
                (err, decode) => {
                    if (err) req.user = undefined;
                    req.user = decode;
                    next();
                })
        } else {
            req.user = undefined;
            next();
        }
    });
    app.use(apiRoot, routes);

    return app
}