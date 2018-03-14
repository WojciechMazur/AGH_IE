import express from 'express'
import bodyParser from 'body-parser'

export default (apiRoot, routes) => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(apiRoot, routes);

    return app
}