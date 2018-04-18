import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
    pythagoras: {
        acolyte:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        }],
        student:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        }],
        master:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        }],
    },
    euclid: {
        acolyte:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        }],
        student:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        }],
        master:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        }],
    },
    aristotle: {
        acolyte:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        }],
        student:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        }],
        master:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        }],
    }
});

const School = mongoose.model('School', schoolSchema);

export default School;
