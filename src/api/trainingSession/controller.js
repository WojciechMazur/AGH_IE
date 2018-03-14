import { success, notFound } from '../../services/response/'
import {mongo} from 'mongoose'
import config from "../../config";
import assert from 'assert'
import TrainingSession from './model.js'

let dbClient;
mongo.connect(`${config.mongoURL}/${config.dbName}`, (err, db) => {
   assert.equal(null, err);
   dbClient = db.db(config.dbName);
});

export const index = (req, res, next) => {
    console.log(req.originalUrl);
    dbClient.collection('TrainingSessions').find(
        ("query" in req.query) ? JSON.parse(req.query['query']) : {},
        {
        limit: parseInt(req.query['limit']) || 0,
        skip:  parseInt(req.query['offset'])  || 0
    }).toArray( (err, docs) => {
        if (err !== null)
            console.log(`Error: ${err}`);
        res.send(docs);
    });
};

export const show = (req, res, next) => {
        dbClient.collection('TrainingSessions').findOne(
            {_id: mongo.Types.ObjectId(req.params.id)}
        ).then( doc => {
            res.send(doc);
        }, err => {
            console.log(`Error: ${err}`)
        })
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


