import jwt from "jsonwebtoken";
import User from "../api/resources/user/user.model"
import _ from "lodash";
const bcrypt = require('bcrypt');

export const signup = async (req, res) => {
  console.log(req.body);
  const hash = await bcrypt.hash(req.body.password, 6);
  req.body.password = hash;
  let newUser = await User.create(req.body);
  if(newUser) {
      const authToken = jwt.sign({_id: newUser._id.toString(), email: newUser.email}, 'mathsecret', (err, token) => {
          newUser.token = token;
          console.log(newUser);
          res.status(200).json(newUser);
      });
  } else {
      res.status(404).json({message: "could not create user"});
  }
};

const generateAuthToken = async (user, res, password) => {
    console.log(user.password);
    bcrypt.compare(password, user.password, (err, ok) => {
        if (ok) {
            const authToken = jwt.sign({_id: user._id.toString(), email: user.email}, 'mathsecret').toString();
            user.token = authToken;
            res.status(200).json(user)
        } else {
            res.status(404).json({message: "Passwords do not match"});
        }
    });
};

export const verifyUser = async (req, res) => {
    let user = await User.find({email: req.headers.email}).exec();
    if(!user) {
        res.status(404).json({message: "user does not exist"})
    }else {
        return generateAuthToken(user[0], res, req.headers.password);
    }
};

export const verifyToken = async (req, res) => {
  const { token } = req.headers;
  const verifiedToken = jwt.verify(token);
  console.log(verifiedToken);
};


