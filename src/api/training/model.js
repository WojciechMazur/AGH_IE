const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
    trainerId: {type: mongoose.Schema.Types.ObjectId, ref:'Trainer'},
    users:    [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    usersLimit: {typ: Number,default: 24},
    date: Date,
    location: String,
    duration: {type: Number, default: 60},
    description: String,

});

export const Training = mongoose.model('Training', trainingSchema);

