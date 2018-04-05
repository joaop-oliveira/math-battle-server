import User from '../api/resources/user/user.model';
import jwt from "jsonwebtoken";
import * as SHA256 from 'crypto-js/sha256';
// get the pwd make the hash put it on the token compare with the database


export const tokens = {};

export const tokenCache = () => ({
    addToken(email) {
        const hashedEmail = SHA256(email + 'mathsecret');
        const stringHashedEmail = hashedEmail.toString();
        tokens[email] = stringHashedEmail;
    },
    authToken(email, res, headerToken) {
        const hashedEmail = SHA256(email + 'mathsecret');
        const stringHashedEmail = hashedEmail.toString();
        const isLogged = Object.values(tokens).some(token => token === stringHashedEmail);
        if (isLogged) {
            res.set('X-Auth', headerToken);
            res.send({authed: true});
        } else {
            res.status(404).json({message: "unsauthorized"});
        }
    }
});

