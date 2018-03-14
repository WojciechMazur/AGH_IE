import { success, notFound } from '../../services/response/'
import {mongo} from 'mongoose'
import config from "../../config";
import assert from 'assert'

let dbClient;
mongo.connect(`${config.mongoURL}/${config.dbName}`, (err, db) => {
   assert.equal(null, err);
   dbClient = db.db(config.dbName);
});

export const index = (req, res, next) => {
    console.log(req.baseUrl);
    notFound(res);
};

export const show = (req, res, next) => {
    notFound(res);
};

export const create = (req, res, next) => {
    notFound(res);
};


export const edit = (req, res, next) => {
    notFound(res);
};

export const remove = (req, res, next) => {
    notFound(res);
};


