import jwt from "jsonwebtoken";
import User from "../api/resources/user/user.model"
import {tokenCache, tokens} from "./helpers";
import _ from "lodash";
const bcrypt = require('bcrypt');
import * as SHA256 from 'crypto-js/sha256';
// get the pwd make the hash put it on the token compare with the database

export const signup = async ({ body }, res) => {
    const { password, email } = body;
    const saltedPasswor = password + 'mathsecret';
    const hashedPasswd = SHA256(saltedPasswor);
    const jwt = createJWT(hashedPasswd, email);
    const token = SHA256(email + hashedPasswd);
    const newUser = {
        ...body,
        password: hashedPasswd,
        token
    };
    try {
        const user = await User.create(newUser);
        tokenCache().addToken(email);
        console.log(tokens);
        res.set('X-Auth', jwt);
        res.status(200).json({message: 'User Created!!'})
    }catch(err) {
        res.status(404).json({error: err})
    }

};

export const signin = async (req, res) => {
    const {password, email} = req.headers;
    try{
        const user = await User.find({email}).exec();
        const { token } = user[0];
        const saltedPassword = password + 'mathsecret';
        const hashedPasswd = SHA256(saltedPassword);
        const jwt = createJWT(hashedPasswd, email);
        const unauthToken = SHA256(email + hashedPasswd);
        if(unauthToken.toString() === token) {
            tokenCache().addToken(email);
            console.log(tokens);
            res.set('X-Auth', jwt);
            res.status(200).json(user);
        }else {
            res.status(404)
                .json({error: "unauthorized", message: "email or password are wrong"});
        }
    } catch(e) {
        res.status(404).json(e)
    }

};

const createJWT = (hashedPasswd, email) =>
    jwt.sign({email, hashedPasswd}, 'mathsecret').toString();

//
// export const verifyUser = async token =>
//         await User.findBytoken(token);

export const verifyToken = async (req, res) => {
  const token = req.get('X-Auth');
      const verifiedToken = jwt.verify(token, 'mathsecret');
      tokenCache().authToken(verifiedToken.email, res, token);
};


