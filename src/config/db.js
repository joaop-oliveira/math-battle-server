import mongoose from "mongoose";
mongoose.Promise = global.Promise;

export const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/math-battle");
};
