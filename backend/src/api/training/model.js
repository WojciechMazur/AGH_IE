import config from "../../config";
const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
    trainerId: {type: mongoose.SchemaTypes.ObjectId, ref:'Trainer', required: true,},
    users:    [{type: mongoose.SchemaTypes.ObjectId, ref: 'User'}],
    usersLimit: {type: Number,default: 24, min: 1, required: true},
    date: {type: Date, required: true},
    location: {type: String, required: true},
    duration: {type: Number, default: 60, required: true},
    description: {type: String, trim: true},

},{
    versionKey: '_docVersion',
    timestamps: true
});

mongoose.connect(`${config.mongoURL}/${config.dbName}`).catch(
    //() => {console.log(`Connection established ${config.mongoURL}/${config.dbName}`)},
    err => {
        console.log(`Error while connecting to DB: ${err}`);
        process.exit(-1);
    });

export const Training = mongoose.model('Training', trainingSchema, 'Trainings');

