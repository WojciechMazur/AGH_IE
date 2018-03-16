import { success, notFound, errorHandler} from '../../services/response/'
import {mongo, Types, ObjectId} from 'mongoose'
import {Trainer} from './model'

mongo.Promise = Promise;


export const index = (req, res, next) => {
    Trainer.find(
        ("query" in req.query) ? JSON.parse(req.query['query']) : {},
    ).limit(parseInt(req.query['limit'])  || 25)
     .skip(parseInt(req.query['offset']) || 0)
     .sort( ("sort" in req.query) ? JSON.parse(req.query['sort']) : {surname: 1},)
    .then(
        docs => {
         success(res,200)(docs);
        },
        err => {
            errorHandler(res)(err)
        }
     );
};

export const show = (req, res, next) => {
    console.log(req.params);
    Trainer.findOne({
            "_id": req.params.id
        }
    ).then(
        doc => {
            if (doc !== null)
                success(res)(doc);
            else
                notFound(res)(req.params)
        },
        err => errorHandler(res)(err)
    )
};

export const create = (req, res, next) => {
    Trainer.findOne(
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
            Trainer.create(trainer);
            res.status(201).end(JSON.stringify(trainer));
        }else{
            console.log("Already exists");
            res.sendStatus(409);
        }
    });
};


export const edit = (req, res, next) => {
    const id = req.params.id;
    const body =req.body;

    Trainer.findById(id)
        .then((doc) => doc ? Object.assign(doc, body).save() : null)
        .then((response) => success(res)(response))
        .catch((err) => errorHandler(res)(err))
};

export const remove = (req, res, next) => {
    const conditions = ("query" in req.query) ? JSON.parse(req.query['query']) : {
        "_id": req.params.id
    };
    Trainer.find(conditions)
        .then((docs) =>{
            console.log(docs);
        Trainer.remove(conditions)
            .then(() => success(res)(docs))
            .catch((err) => errorHandler(res)(err))
        })
        .catch((err)=> errorHandler(res)(err));
};


