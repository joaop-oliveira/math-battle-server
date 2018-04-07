import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
    pythagoras: {
        student:{
            users: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                }
            ]
        }
    },
    euclid: {
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    aristotle: {
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }

});

const School = mongoose.model('School', schoolSchema);

export default School;
