import { success, notFound } from '../../services/response/'
import {mongo} from 'mongoose'
import {Training} from "./model";
import {User} from "../user/model"
import config from '../../config'
import {errorHandler} from "../../services/response";

export const index = (req, res, next) => {
    Training.find(
        ("query" in req.query) ? JSON.parse(req.query['query']) : {},
    ).limit(parseInt(req.query['limit'])  || 25)
        .skip(parseInt(req.query['offset']) || 0)
        .sort( ("sort" in req.query) ? JSON.parse(req.query['sort']) : {date: 1},)
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
    Training.findOne({
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
    );
};

export const create = (req, res, next) => {
    Training.findOne(
        {
            $and: [
                {date: req.body.date},
                {location: req.body.location},
                {trainerId: req.body.trainerId}
            ]
        }, (err, training) => {
            if (training === null) {
                let training = new Training(req.body);
                Training.create(training);
                success(res)(training);
            } else {
                res.status(409).json({
                    "error": {
                        "name": "DuplicationError",
                        "message": `Duplicate key error collection: ${config.dbName}.Trainings, Object with given params already exists`,
                        "params": {
                            "date": req.body.date,
                            "location": req.body.location,
                            "trainerId": req.body.trainerId
                        }
                    }
                });
            }
        });
};


export const edit = (req, res, next) => {
    const id = req.params.id;
    const body =req.body;

    Training.findById(id)
        .then((doc) => doc ? Object.assign(doc, body).save() : null)
        .then((response) => success(res)(response))
        .catch((err) => errorHandler(res)(err))};

export const remove = (req, res, next) => {
    const conditions = ("query" in req.query) ? JSON.parse(req.query['query']) : {
        "_id": req.params.id
    };
    Training.find(conditions)
        .then((docs) =>{
            Training.remove(conditions)
                .then(() => success(res)(docs))
                .catch((err) => errorHandler(res)(err))
        })
        .catch((err)=> errorHandler(res)(err));
};

export const addUser = (req, res, next) => {
    const trainingId = req.params.id;
    const userId = req.params.userId;
    Promise.all([
        Training.findById(trainingId),
        User.findById(userId)
    ]).then(([training, user]) => {
        if ((training['users'].indexOf(user.id)>=0))
            return res.status(200)("User already signed in");
        if ((training.users.length>training.usersLimit))
            return res.status(304)("Users limit has been reached");
        training['users'].push(user.id);
        training.save()
            .then(success(res)(training));
    }).catch((err)=> {
        console.log(err);
        res.sendStatus(500)(err)
    })
};

export const deleteUser = (req, res, next) => {
    const trainingId = req.params.id;
    const userId = req.params.userId;
    Training.findById(trainingId)
        .then((training) =>{
            training.users = training.users.filter(e => e.toString() !== userId);
            return training;
        }).then(training=>training.save())
        .then((training) => {
            success(res)(training);
        }).catch((err) => {
        res.sendStatus(500)(err);
    });
};

export const getUsers = (req, res, next)=> {
    Training.findById(req.params.id)
        .then(training => training.users)
        .then(users =>{
         let asyncUsersInfo=users.map((user) => User.findById(user)
                .then(user => user.view('minimal')));
        Promise.all(asyncUsersInfo)
            .then((users) => success(res)(users));
        }).catch(err => success(res, 500)(err));
};



