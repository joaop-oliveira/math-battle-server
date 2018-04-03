
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required"]
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
        required: [true, 'User must have an email']
    },
    active: {
      type: Boolean,
      required: [true, "User must be active or not"]
    },
    totalPoints: {
      type: String,
      required: false
    },
    clan : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clan'
    }
});

const User = mongoose.model('User', userSchema);

export default User;