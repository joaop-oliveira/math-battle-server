import mongoose from "mongoose";
mongoose.Promise = global.Promise;

export const connect = () => {
    return mongoose.connect("mongodb://dev_user:dev_123@ds051524.mlab.com:51524/math-battle-db");
};
// return mongoose.connect("mongodb://joaop.oliveira:221294gt@ds051524.mlab.com:51524/math-battle-db");

// return mongoose.connect("mongodb://localhost:27017/math-battle");