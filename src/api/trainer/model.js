import config from "../../config";
const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
    name: String,
    surname: String,
    specialization: [String],
    info: String,
    email: {type: String, unique: true, match:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
    phone: {type: String, unique: true, match: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/}
}, {
    versionKey: '_version',
    timestamps: true
});

mongoose.connect(`${config.mongoURL}/${config.dbName}`).catch(
    err => console.log(`Error while connecting to DB: ${err}`)
);

export const Trainer = mongoose.model('Trainer', trainerSchema, 'Trainers');


