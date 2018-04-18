import mongoose from "mongoose";
mongoose.Promise = global.Promise;

export const connect = () => {
    return mongoose.connect("mongodb://math-battle-user:221294gt@ds147589.mlab.com:47589/math-battle-db");
};
// return mongoose.connect("mongodb://joaop.oliveira:221294gt@ds051524.mlab.com:51524/math-battle-db");

// return mongoose.connect("mongodb://localhost:27017/math-battle");