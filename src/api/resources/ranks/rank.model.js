import mongoose from 'mongoose';

const rankSchema = new mongoose.Schema({
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
});

rankSchema.post('save', async doc => {
   console.log(doc);
});

const Rank = mongoose.model('Rank', rankSchema);

export default Rank;
