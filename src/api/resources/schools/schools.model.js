import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
    pythagoras: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rank'
    },
    euclid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rank'
    },
    aristotle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rank'
    }
});

const School = mongoose.model('School', schoolSchema);

export default School;
