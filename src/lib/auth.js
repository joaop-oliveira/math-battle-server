import jwt from "jsonwebtoken";
import User from "../api/resources/user/user.model"
// import _ from "lodash";
const bcrypt = require('bcrypt');
const SHA256 = require('crypto-js/sha256');

export const signup = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 6);
  // const refreshToken = crypto.randomBytes();
  req.body.password = hash;
  let newUser = await User.create(req.body);
  if(newUser) {
      const authToken = jwt.sign({_id: newUser._id.toString(), email: newUser.email}, 'mathsecret', {expiresIn: 30});
      const newAuthedUser = {
          ...newUser._doc,
          token: authToken
      };
      console.log(newUser);
      res.status(200).json(newAuthedUser);
  } else {
      res.status(404).json({message: "could not create user"});
  }
};

const generateAuthToken = async (user, res, password) => {
    const hash = await bcrypt.compare(password, user.password);
    if(hash) {
        const hashKey = SHA256(Math.random()).toString();
        const refreshToken = jwt.sign({_id: user._id.toString(), email: user.email, hashKey}, 'mathsecret');
        const authToken = jwt.sign({_id: user._id.toString(), email: user.email}, 'mathsecret', {expiresIn: 30}).toString();
        const authedUser = {
            ...user._doc,
            token: authToken,
            refreshToken
        };
        res.status(200).json(authedUser);
    } else {
        res.status(404).json({message: "Incorrect password"})
    }
};

export const verifyUser = async (req, res) => {
    let user = await User.find({email: req.headers.email}).exec();
    if(!user) {
        res.status(404).json({message: "user does not exist"})
    }else {
        generateAuthToken(user[0], res, req.headers.password);
    }
};

export const authorize = async (req, res, next) => {
  const { token, refreshToken } = req.headers;
  if(refreshToken) {
      const verifiedToken = jwt.verify(token, 'mathsecret');
      if (verifiedToken){
          console.log(verifiedToken);
          next();
      } else {
          res.status(404).json({message: "user unauthorized"})
      }
  } else {
      res.status(404).json({message: "session expired"})
  }
};


