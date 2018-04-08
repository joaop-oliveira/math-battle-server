import mongoose from 'mongoose';

const rankSchema = new mongoose.Schema({
        acolyte:{
            users: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                }
            ]
        },
        student:{
            users: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                }
            ]
        },
        master:{
            users: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                }
            ]
        },
});

const Rank = mongoose.model('Rank', rankSchema);

export default Rank;
