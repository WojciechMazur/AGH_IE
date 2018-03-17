import {errorHandler, success} from "../../services/response";
import {User} from '../user/model'

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require('../../config');

export const register= (req, res, next) => {
    new User(req.body).save()
        .then((user)=> user.view('filtered'))
        .then((user) => success(res)(user))
        .catch(next)
};

export const signIn = (req, res, next) => {
    User.findOne({
        email: req.body.email
    }).exec()
        .then((user, err) => {
        if (err) errorHandler(res)(err);
        if (!user) {
            res.status(401).json({message: 'Authentication failed. User not found'})
        } else {
            if (!user.comparePasswords(req.body.password)){
                console.log(user.comparePasswords(req.body.password));
                res.status(401).json({message: 'Authentication failed. Wrong password'});

            }
            else
                return res.json({
                    token: jwt.sign(
                        {
                            email: user.email,
                            _id: user._id
                        }, config.secret, {expiresIn: '24h'})
                });
        }
    });
};

export const loginRequired = (req, res, next)=>{
    if(req.user){
        next();
    }else{
        return res.status(401).json({message: 'Unauthorized user!'})
    }
};