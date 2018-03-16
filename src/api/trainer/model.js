import config from "../../config";
import {mongo} from "mongoose";
import assert from "assert";

const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
    name: String,
    surname: String,
    specialization: [String],
    info: String,
    email: String,
    phone: String
}, {
    versionKey: '_version',
    timestamps: true
});

mongoose.connect(`${config.mongoURL}/${config.dbName}`).then(
    () => {console.log("Connection established")},
    err => console.log(`Error while connecting to DB: ${err}`)
);

export const Trainer = mongoose.model('Trainer', trainerSchema, 'Trainers');


