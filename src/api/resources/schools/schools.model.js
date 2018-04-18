import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
    pythagoras: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    euclid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    aristotle: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }]
});

const School = mongoose.model('School', schoolSchema);

export default School;
