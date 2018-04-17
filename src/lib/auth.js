import jwt from "jsonwebtoken";
import Player from "../api/resources/player/player.model"
import { tokenCache, sessionTokens } from "./helpers";
import * as SHA256 from 'crypto-js/sha256';
// get the pwd make the hash put it on the token compare with the database

export const signup = async ({ body }, res) => {
    const { password, email } = body;
    const saltedPasswor = password + 'mathsecret';
    const hashedPasswd = SHA256(saltedPasswor);
    const jwt = createJWT(hashedPasswd, email);
    const token = SHA256(email + hashedPasswd);
    const newPlayer = {
        ...body,
        password: hashedPasswd,
        token
    };
    try {
        const player = await Player.create(newPlayer);
        tokenCache().addToken(email);
        // console.log(sessionTokens);
        res.set('X-Auth', jwt);
        res.status(200).json({message: 'Player Created!!'})
    }catch(err) {
        res.status(404).json({error: err})
    }

};

export const signin = async (req, res) => {
    const {password, email} = req.headers;
    try{
        const player = await Player.find({email}).exec();
        const { token } = player[0];
        const saltedPassword = password + 'mathsecret';
        const hashedPasswd = SHA256(saltedPassword);
        const jwt = createJWT(hashedPasswd, email);
        const unauthToken = SHA256(email + hashedPasswd);
        if(unauthToken.toString() === token) {
            tokenCache().addToken(email);
            console.log(sessionTokens);
            res.set('X-Auth', jwt);
            res.status(200).json(player);
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

export const destroySession = (email, res) =>
    tokenCache().removeToken(email, res);

export const verifyToken = async (req, res) => {
  const token = req.get('X-Auth');
      const verifiedToken = jwt.verify(token, 'mathsecret');
      const { email } = verifiedToken;
      tokenCache().authToken(email, res, token);
};


