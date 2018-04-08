import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
    pythagoras: {
        rank: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rank'
        }
    },
    euclid: {
        rank: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rank'
        }
    },
    aristotle: {
        rank: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rank'
        }
    }
});

const School = mongoose.model('School', schoolSchema);

export default School;
