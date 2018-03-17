import { success, notFound, errorHandler} from '../../services/response/'
import {mongo} from 'mongoose'
import {User} from './model'
mongo.Promise = Promise;


export const index = (req, res, next) => {
    User.find(
        ("query" in req.query) ? JSON.parse(req.query['query']) : {},
    ).limit(parseInt(req.query['limit'])  || 25)
     .skip(parseInt(req.query['offset']) || 0)
     .sort(("sort" in req.query) ? JSON.parse(req.query['sort']) : {surname: 1, name: 1},)
    .then((users) => users.map((user) => user.view('minimal')))
    .then(success(res))
    .catch(next)
};

export const show = (req, res, next) => {
    User.findById(req.params.id).exec()
    .then((user)=> user ? user.view('full') : null)
    .then(success(res))
    .catch(notFound(res))
};

export const create = (req, res, next) => {
    new User(req.body).save()
        .then((user)=> user.view('full'))
        .then((user) => success(res)(user))
        .catch(next)
};

export const edit = (req, res, next) => {
    const id = req.params.id;
    const body =req.body;

    User.findById(id)
        .then(notFound(res))
        .then((doc) => doc ? Object.assign(doc, body).save() : null)
        .then((user) => user ? user.view('full') : null)
        .then(success(res))
        .catch(next);
};

export const remove = (req, res, next) => {
    const conditions = ("query" in req.query) ? JSON.parse(req.query['query']) : {
        "_id": req.params.id
    };
    User.find(conditions)
        .then((docs) => {
            User.remove(conditions)
                .then(() => success(res)(docs))
                .catch((err) => errorHandler(res)(err))
        })
        .catch((err) => errorHandler(res)(err));
};

