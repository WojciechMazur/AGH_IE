const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
    name: String,
    surname: String,
    specialization: [String],
    info: String,
    email: String,
    phone: String
});

export const Trainer = mongoose.model('Trainer', trainerSchema);

