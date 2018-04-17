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
    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        }
    ]
});

const Clan = mongoose.model('Clan', clanSchema);

export default Clan;
