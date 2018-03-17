const mongoose = require("mongoose");
const trainingSessionTypes  = [
    'RUNNING',
    'TRAIL RUNNING',
    'TREADMILL',
    'CYCLING',
    'CIRCUIT_TRAINING',
    'STRENGTH_TRAINING',
    'CROSSFIT',
    'OTHER'
];

const trainingSessionSchema = new mongoose.Schema({
    activityType: {
        type: String,
        enum: trainingSessionTypes,
        default: 'OTHER'
    },
    userId:     {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    trainingId: {type: mongoose.Schema.Types.ObjectId, ref: 'Training'},
    date: {type: Date, default: Date.now},
    duration: Date,
    distance: Number,
    altitudeMax: Number,
    altitudeMin: Number,
    ascent: {type: Number, default: 0},
    descent: {type: Number, default: 0},
    calories: Number,
    averageTempo: Number,
    maxTempo: Number,
    minTempo: Number,
    avgHR: Number,
    maxHR: Number,
    minHR: Number,
    points: [{
        lng: Number,
        lat: Number,
        cad: Number,
        dist: Number,
        hr: Number,
        time: Date,

    }]
});

export const TrainingSession = mongoose.model('TrainingSession', trainingSessionSchema);

