import mongoose from 'mongoose';

const clanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required']
    },
    total_points: {
        type: String,
        required: false
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

const Clan = mongoose.model('Clan', clanSchema);

export default Clan;
