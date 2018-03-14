import { success, notFound } from '../../services/response/'
import {mongo, Query} from 'mongoose'
import config from "../../config";
import assert from 'assert'
import {Trainer} from './model'

let dbConnection;
let dbCollection;
mongo.connect(`${config.mongoURL}/${config.dbName}`, (err, db) => {
    assert.equal(null, err);
    dbConnection = db.db(config.dbName);
    dbCollection = dbConnection.collection("Trainer");
});

export const index = (req, res, next) => {
    console.log(req.baseUrl);
    success(res)({response: 'hello world'})

};

export const show = (req, res, next) => {
    res.sendStatus(501);
};

export const create = (req, res, next) => {
    dbCollection.findOne(
        {
            $and:[
                {name: req.body.name},
                {surname: req.body.surname},
                {email: req.body.email}
            ]
        }, (err, trainer) => {
        if(err)
            res.sendStatus(400)(err);
        if(trainer===null){
            console.log("creating");
            let trainer = new Trainer(req.body);
            dbCollection.insert(trainer);
            res.status(201).end(JSON.stringify(trainer));
        }else{
            console.log("Already exists");
            res.sendStatus(409);

        }
    });
};


export const edit = (req, res, next) => {
    res.sendStatus(501);
};

export const remove = (req, res, next) => {
    res.sendStatus(501);
};


