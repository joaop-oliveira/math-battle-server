
import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Player name is required"]
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    user_name: {
        type: String,
        required: [true, 'user.name is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Player must have an email']
    },
    active: {
      type: Boolean,
      required: [true, "Player must be active or not"]
    },
    totalPoints: {
      type: Number,
      required: false
    },
    rank_points:{
      type: Number,
      required: false
    },
    clan : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clan'
    },
    token: {
        type: String,
        required: true
    }
});

playerSchema.methods.findByToken = (token) => {
    const Player = this;
    try {
        return Player.find({token}).exec();
    }catch(e) {
        return Promise.reject();
    }
};

const Player = mongoose.model('Player', playerSchema);

export default Player;